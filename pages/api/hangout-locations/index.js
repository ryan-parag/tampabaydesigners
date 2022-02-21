const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async (req,res) => {

  const response = await notion.databases.query({ 
    database_id: process.env.NOTION_LOCATIONS,
  });

  const locations = []

  response.results.map(item => {

    const lineItem = {
      id: item.id,
      name: item.properties.Name.title[0].plain_text,
      address: item.properties.Address.rich_text[0].plain_text,
      region: item.properties.Location.select.name,
    }

    locations.push(lineItem)

  })

  res.status(200).json({ locations });
}