const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` });
  }
  try {
    const { id } = JSON.parse(req.body);

    await notion.pages.update({
      page_id: id,
      archived: true
    });

    res.status(201).json({ msg: 'Removed from attendance' });
  } catch (error) {
    res.status(500).json({ msg: 'There was an error' });
  }
}