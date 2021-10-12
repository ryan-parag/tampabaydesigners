const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async (req,res) => {

  const pageId = '371aa034-e26b-494c-9ab4-c95868e04dac';

  const pageData = await notion.pages.retrieve({ page_id: pageId });

  const pageContent = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 50,
  });

  const data = {
    name: pageData.properties.Name.title[0].plain_text,
    twitter: pageData.properties.Twitter.rich_text[0].plain_text,
    website: pageData.properties.Website.url
  }

  res.status(200).json({ data });
}