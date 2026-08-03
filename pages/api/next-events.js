const { Client } = require('@notionhq/client');
import moment from 'moment'
import { withMeetupLinks } from '@utils/meetup';

const notion = new Client({ auth: process.env.NOTION_SECRET });

// The next upcoming Design Hangout and next upcoming Designer Cowork, reported separately.
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

  const hangout = events.find(event => event.name.includes('Design Hangout')) ?? null
  const cowork = events.find(event => event.name.includes('Designer Cowork')) ?? null

  if (hangout) hangout.type = 'hangout'
  if (cowork) cowork.type = 'cowork'

  await withMeetupLinks([hangout, cowork].filter(Boolean))

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
  res.status(200).json({ hangout, cowork });
}
