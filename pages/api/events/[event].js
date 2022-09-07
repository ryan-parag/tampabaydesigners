const { Client } = require('@notionhq/client');
import moment from 'moment';

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async (req,res) => {

  const {
    query: { event },
  } = req

  const today = new Date().toISOString()

  const response = await notion.pages.retrieve({ page_id: event });

  const attending = response.properties.Attending.rollup.array

  const item = {
    id: response.id,
    name: response.properties.Name.title[0].plain_text,
    description: response.properties.Description.rich_text[0].plain_text,
    org: response.properties.Org.select.name,
    link: response.properties.Link.url,
    date: response.properties.Date.date.start,
    location: response.properties.Location.relation[0].id,
    diff: moment(response.properties.Date.date.start).diff(moment(today), 'days'),
    attending: []
  }

  attending.map(attendee => {
    item.attending.push(attendee.title[0].text.content)
  })

  res.status(200).json({ item });
}