const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` });
  }
  try {
    const { name, email, avatar, event, sub } = JSON.parse(req.body);
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_ATTENDEES,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Avatar: {
          url: avatar
        },
        Events: {
          relation: [
            {
              id: event
            }
          ]
        },
        Auth_id: {
          rich_text: [
            {
              text: {
                content: sub
              }
            }
          ]
        }
      },
    });
    res.status(201).json({ msg: 'Added to attendance' });
  } catch (error) {
    res.status(500).json({ msg: 'There was an error' });
  }
}