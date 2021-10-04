const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async (req,res) => {

  const response = await notion.databases.query({ 
    database_id: process.env.NOTION_CREDITS,
  });

  const credits = []

  response.results.map(item => {

    const lineItem = {
      id: item.id,
      name: item.properties.Name.title[0].plain_text,
      description: item.properties.Description.rich_text[0].plain_text,
      logo: item.properties.Logo.files[0].file.url,
      link: item.properties.Link.url
    }

    if(item.properties.Verified.checkbox) {
      credits.push(lineItem)
    }

  })

  res.status(200).json({ credits });
}