const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

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
            "on_or_after": today
          }
        }
      ]
    },
    sorts: [
      {
          "property": "Date",
          "direction": "descending"
      }
    ]
  });

  const events = []

  response.results.map(item => {

    const lineItem = {
      id: item.id,
      name: item.properties.Name.title[0].plain_text,
      description: item.properties.Description.rich_text[0].plain_text,
      org: item.properties.Org.select.name,
      link: item.properties.Link.url,
      date: item.properties.Date.date.start,
      location: item.properties.Location.relation[0].id,
      locationName: item.properties.LocationName.formula.string
    }

    events.unshift(lineItem)

  })

  res.status(200).json({ events });
}