const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async (req,res) => {

  const response = await notion.databases.query({ 
    database_id: 'b95ed64106c948cb8963705ebce507dd',
  });

  const groups = []

  res.status(200).json({ response });
}