const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async (req,res) => {

  const {
    query: { event },
  } = req
  
  const response = await notion.databases.query({ 
    database_id: process.env.NOTION_ATTENDEES,
    filter: {
      "and": [
        {
          "property": "Events",
          "relation": {
              "contains": event
          }
        },
      ]
    }
  });

  const list = []

  response.results.map(item => list.push(item.properties.Auth_id.rich_text[0].text.content))

  res.status(200).json({ list });
}