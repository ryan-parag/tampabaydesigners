const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async (req,res) => {

  const response = await notion.databases.query({ 
    database_id: process.env.NOTION_EVENTS,
  });

  const events = []

  response.results.map(item => {

    const lineItem = {
      id: item.id,
      name: item.properties.Name.title[0].plain_text,
      description: item.properties.Description.rich_text[0].plain_text,
      org: item.properties.Org.select.name,
      link: item.properties.Link.url,
      date: item.properties.Date.date.start
    }

    if(item.properties.Verified.checkbox) {
      events.push(lineItem)
    }

  })

  res.status(200).json({ events });
}