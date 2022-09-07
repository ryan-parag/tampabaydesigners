const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` });
  }
  try {
    const { event, sub } = JSON.parse(req.body);

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
                "contains": sub
            }
          },
        ]
      }
    });

    res.status(201).json({ msg: 'Removed from attendance' });
  } catch (error) {
    res.status(500).json({ msg: 'There was an error' });
  }
}