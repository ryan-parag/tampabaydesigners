const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async (req,res) => {
  if(req.method === 'POST') {

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_CONTACTS,
      },
      properties: {
        Email: {
          title: [
            {
              text: {
                content: req.body.contact.email,
              },
            },
          ],
        }
      }
    })
  
    res.status(201).json(req.body.contact)
  } else {
    const response = await notion.databases.query({ 
      database_id: process.env.NOTION_CONTACTS,
    });
  
    const contacts = []
  
    response.results.map(item => {
  
      const lineItem = {
        id: item.id,
        email: item.properties.Email.title[0].plain_text
      }

      contacts.push(lineItem)
  
    })
  
    res.status(200).json({ contacts });
  }
}