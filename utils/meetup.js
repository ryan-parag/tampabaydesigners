// Resolves per-event Meetup links from the group's public iCal feed.
// Mirrors meetupUrl in siteconfig.json — kept as a plain constant so this
// module has no imports and can be exercised directly with node.
const FEED_URL = 'https://www.meetup.com/tampabaydesigners/events/ical/'

const CACHE_TTL = 10 * 60 * 1000
const FETCH_TIMEOUT = 5000

let cache = { byDate: null, fetchedAt: 0 }
let inflight = null

export function parseIcalFeed(text) {
  // RFC 5545 folds long lines; continuation lines start with a space or tab
  const lines = []
  text.split(/\r?\n/).forEach(raw => {
    if ((raw.startsWith(' ') || raw.startsWith('\t')) && lines.length) {
      lines[lines.length - 1] += raw.slice(1)
    } else {
      lines.push(raw)
    }
  })

  const events = []
  let current = null

  lines.forEach(line => {
    if (line === 'BEGIN:VEVENT') {
      current = {}
      return
    }
    if (line === 'END:VEVENT') {
      if (current?.date && current?.url) {
        events.push(current)
      }
      current = null
      return
    }
    if (!current) return

    const colon = line.indexOf(':')
    if (colon === -1) return
    const name = line.slice(0, colon).split(';')[0]
    const value = line.slice(colon + 1)

    if (name === 'DTSTART') {
      // First 8 chars cover both YYYYMMDDTHHMMSS and all-day YYYYMMDD forms
      current.date = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`
    } else if (name === 'SUMMARY') {
      current.summary = value.replace(/\\n/gi, ' ').replace(/\\([,;\\])/g, '$1')
    } else if (name === 'URL') {
      current.url = value
    }
  })

  return events
}

export function groupByDate(events) {
  const byDate = new Map()
  events.forEach(event => {
    if (!byDate.has(event.date)) {
      byDate.set(event.date, [])
    }
    byDate.get(event.date).push(event)
  })
  return byDate
}

async function fetchFeed(feedUrl) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT)
  try {
    const response = await fetch(feedUrl, { signal: controller.signal })
    if (!response.ok) {
      throw new Error(`Meetup feed responded ${response.status}`)
    }
    return groupByDate(parseIcalFeed(await response.text()))
  } finally {
    clearTimeout(timer)
  }
}

export async function getMeetupEventsByDate(feedUrl = FEED_URL) {
  if (cache.byDate && Date.now() - cache.fetchedAt < CACHE_TTL) {
    return cache.byDate
  }
  if (!inflight) {
    inflight = fetchFeed(feedUrl)
      .then(byDate => {
        cache = { byDate, fetchedAt: Date.now() }
        return byDate
      })
      // Serve the stale map (or null) rather than ever throwing
      .catch(error => {
        console.error('Meetup feed fetch failed:', error.message)
        return cache.byDate
      })
      .finally(() => {
        inflight = null
      })
  }
  return inflight
}

function tokenize(str) {
  return new Set(
    (str || '')
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
  )
}

export function resolveMeetupLink(byDate, event) {
  if (!byDate || !event?.date) return null

  // Notion dates serialize with the local offset, so the first 10 chars are
  // the local calendar date for both date-only and datetime values
  const candidates = byDate.get(event.date.slice(0, 10))
  if (!candidates || candidates.length === 0) return null
  if (candidates.length === 1) return candidates[0].url

  // Two events on the same day: pick the best title overlap, or nothing —
  // the group-page fallback beats a wrong RSVP link
  const eventTokens = tokenize(event.name)
  let best = null
  let bestScore = 0
  candidates.forEach(candidate => {
    let score = 0
    tokenize(candidate.summary).forEach(token => {
      if (eventTokens.has(token)) score++
    })
    if (score > bestScore) {
      best = candidate
      bestScore = score
    }
  })
  return best?.url ?? null
}

export async function withMeetupLinks(events) {
  try {
    const list = Array.isArray(events) ? events : [events]
    if (!list.some(event => event && !event.link)) return events

    const byDate = await getMeetupEventsByDate()
    if (!byDate) return events

    list.forEach(event => {
      if (event && !event.link) {
        event.link = resolveMeetupLink(byDate, event) ?? event.link
      }
    })
  } catch (error) {
    console.error('Meetup link enrichment failed:', error.message)
  }
  return events
}
