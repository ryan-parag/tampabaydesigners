const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async (req,res) => {

  const {
    query: { location },
  } = req

  const response = await notion.pages.retrieve({ page_id: location });

  const item = {
    id: response.id,
    name: response.properties.Name.title[0].plain_text,
    address: response.properties.Address.rich_text[0].plain_text,
    region: response.properties.Location.select.name,
  }

  res.status(200).json({ item });
}