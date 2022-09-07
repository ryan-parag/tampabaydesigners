const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async (req,res) => {

  const {
    query: { attendee, event },
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
        }, {
          "property": "Auth_id",
          "rich_text": {
              "contains": attendee
          }
        }
      ]
    }
  });

  const userData = response.results[0]

  const user = {
    id:response.results.length > 0 ? response.results[0].id : null,
    attending: response.results.length > 0
  }

  res.status(200).json({ user });
}