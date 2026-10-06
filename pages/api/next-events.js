const { Client } = require('@notionhq/client');
import moment from 'moment'
import { withMeetupLinks } from '@utils/meetup';

const notion = new Client({ auth: process.env.NOTION_SECRET });

// Every Design Hangout and Designer Cowork in the next 30 days, soonest first.
export default async (req,res) => {

  const today = new Date().toISOString()

  const response = await notion.databases.query({
    database_id: process.env.NOTION_EVENTS,
    filter: {
      "and": [
        {
          "property": "Verified",
          "checkbox": {
              "equals": true
          }
        },
        {
          "property": "Date",
          "date": {
            "on_or_after": moment().format('YYYY-MM-DD')
          }
        }
      ]
    },
    sorts: [
      {
          "property": "Date",
          "direction": "ascending"
      }
    ],
    page_size: 100
  });

  const events = response.results.map(item => ({
    id: item.id,
    name: item.properties.Name?.title?.[0]?.plain_text ?? '',
    description: item.properties.Description?.rich_text?.[0]?.plain_text ?? '',
    org: item.properties.Org?.select?.name ?? null,
    link: item.properties.Link?.url,
    date: item.properties.Date?.date?.start ?? null,
    upcoming: moment(item.properties.Date?.date?.start ?? null).isAfter(moment().format('YYYY-MM-DD')),
    locationName: item.properties.LocationName?.formula?.string ?? null,
    diff: moment(item.properties.Date?.date?.start ?? null).diff(moment(today), 'days')
  })).filter(event => event.upcoming)

  const items = events
    .filter(event => event.diff >= 0 && event.diff <= 30)
    .filter(event => /Design Hangout|Designer Cowork/.test(event.name))
    .map(event => ({ ...event, type: event.name.includes('Designer Cowork') ? 'cowork' : 'hangout' }))

  await withMeetupLinks(items)

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
  res.status(200).json({ items });
}
