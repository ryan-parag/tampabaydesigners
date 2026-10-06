const { Client } = require('@notionhq/client');
import moment from 'moment';

const notion = new Client({ auth: process.env.NOTION_SECRET });

const verified = {
  "property": "Verified",
  "checkbox": {
      "equals": true
  }
}

// Every year from the oldest verified event through the current one,
// newest first.
const getYears = async (currentYear) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_EVENTS,
    filter: verified,
    sorts: [
      {
          "property": "Date",
          "direction": "ascending"
      }
    ],
    page_size: 1
  });

  const oldest = response.results[0]?.properties.Date?.date?.start
  const firstYear = oldest ? Math.min(moment(oldest).year(), currentYear) : currentYear

  const years = []
  for (let year = currentYear; year >= firstYear; year--) {
    years.push(year)
  }
  return years
}

// Verified events in the given year that have already happened, most
// recent first. Follows Notion's cursor so the whole year comes back at once.
const getEventsForYear = async (year, now) => {
  const results = []
  let cursor

  do {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_EVENTS,
      filter: {
        "and": [
          verified,
          {
            "property": "Date",
            "date": {
              "on_or_after": `${year}-01-01`
            }
          },
          {
            "property": "Date",
            "date": {
              "before": `${year + 1}-01-01`
            }
          },
          {
            "property": "Date",
            "date": {
              "before": now
            }
          }
        ]
      },
      sorts: [
        {
            "property": "Date",
            "direction": "descending"
        }
      ],
      page_size: 100,
      start_cursor: cursor
    });

    results.push(...response.results)
    cursor = response.has_more ? response.next_cursor : undefined
  } while (cursor)

  return results.map(item => ({
    id: item.id,
    name: item.properties.Name?.title?.[0]?.plain_text ?? '',
    description: item.properties.Description?.rich_text?.[0]?.plain_text ?? '',
    org: item.properties.Org?.select?.name ?? null,
    date: item.properties.Date?.date?.start ?? null,
    locationName: item.properties.LocationName?.formula?.string ?? null,
    diff: moment(item.properties.Date?.date?.start ?? null).diff(moment(now), 'days')
  }))
}

export default async (req,res) => {

  const now = new Date().toISOString()
  const currentYear = new Date().getFullYear()

  const requested = parseInt(req.query.year, 10)
  const year = requested >= 2000 && requested <= currentYear ? requested : currentYear

  const [years, events] = await Promise.all([
    getYears(currentYear),
    getEventsForYear(year, now)
  ])

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
  res.status(200).json({ year, years, events });
}
