const { Client } = require('@notionhq/client');
import moment from 'moment'
import { withMeetupLinks } from '@utils/meetup';

const notion = new Client({ auth: process.env.NOTION_SECRET });

// The next two upcoming verified events of any type, ascending by date.
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
    page_size: 5
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

  const latest = events.length > 0 ? events[0] : {upcoming: false}
  const next = events.length > 1 ? events[1] : null

  if (latest.upcoming) {
    await withMeetupLinks(events.slice(0, 2))
  }

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
  res.status(200).json({ latest, next });
}
