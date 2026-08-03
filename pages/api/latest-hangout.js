const { Client } = require('@notionhq/client');
import moment from 'moment'
import { withMeetupLinks } from '@utils/meetup';

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async (req,res) => {

  const response = await notion.databases.query({ 
    database_id: process.env.NOTION_EVENTS,
  });

  const hangouts = []

  const today = new Date().toISOString()

  response.results.map(item => {

    const events = []

    if(item.properties.Verified?.checkbox && item.properties.Name?.title?.[0]?.plain_text?.includes('Design Hangout')) {
      const event = {
        id: item.id,
        name: item.properties.Name?.title?.[0]?.plain_text ?? '',
        description: item.properties.Description?.rich_text?.[0]?.plain_text ?? '',
        org: item.properties.Org?.select?.name ?? null,
        link: item.properties.Link?.url,
        date: item.properties.Date?.date?.start ?? null,
        upcoming: moment(item.properties.Date?.date?.start ?? null).isAfter(moment().format('YYYY-MM-DD')),
        locationName: item.properties.LocationName?.formula?.string ?? null,
        diff: moment(item.properties.Date?.date?.start ?? null).diff(moment(today), 'days')
      }
      events.push(event)
    }

    events.map(item => {
      if(item.upcoming === true) {
        hangouts.push(item)
      }
    })
  })

  hangouts.sort(function(a,b){
    return new Date(a.date) - new Date(b.date);
  })

  const latest = hangouts.length > 0 ? hangouts[0] : {upcoming: false}

  if (latest.upcoming) {
    await withMeetupLinks(latest)
  }

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
  res.status(200).json({ latest });
}