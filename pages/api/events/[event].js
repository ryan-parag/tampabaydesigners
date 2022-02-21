const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async (req,res) => {

  const {
    query: { event },
  } = req

  const response = await notion.pages.retrieve({ page_id: event });

  const item = {
    id: response.id,
    name: response.properties.Name.title[0].plain_text,
    description: response.properties.Description.rich_text[0].plain_text,
    org: response.properties.Org.select.name,
    link: response.properties.Link.url,
    date: response.properties.Date.date.start,
    location: response.properties.Location.relation[0].id
  }

  res.status(200).json({ item });
}