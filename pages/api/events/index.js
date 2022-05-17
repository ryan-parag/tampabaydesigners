const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async (req,res) => {

  const response = await notion.databases.query({ 
    database_id: process.env.NOTION_EVENTS,
    filter: {
      property: "Verified",
      checkbox: {
        equals: true
      }
    },
    sorts: [
      {
          "property": "Date",
          "direction": "descending"
      }
    ]
  });

  const events = []

  const today = new Date().toISOString()

  response.results.map(item => {

    const lineItem = {
      id: item.id,
      name: item.properties.Name.title[0].plain_text,
      description: item.properties.Description.rich_text[0].plain_text,
      org: item.properties.Org.select.name,
      link: item.properties.Link.url,
      date: item.properties.Date.date.start,
      location: item.properties.Location.relation[0].id
    }

    if(item.properties.Verified.checkbox) {
      if(item.properties.Date.date.start >= today) {
        events.unshift(lineItem)
      }
    }

  })

  res.status(200).json({ events });
}