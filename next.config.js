require('dotenv').config();

module.exports = {
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE: process.env.AIRTABLE_BASE,
    NOTION_SECRET: process.env.NOTION_SECRET,
    NOTION_SLACK: process.env.NOTION_SLACK,
    NOTION_GROUPS: process.env.NOTION_GROUPS,
    NOTION_CONTACTS: process.env.NOTION_CONTACTS,
    NOTION_EVENTS: process.env.NOTION_ENENTS,
    NOTION_CREDITS: process.env.NOTION_CREDITS,
    NOTION_INTERVIEWS: process.env.NOTION_INTERVIEWS,
    NOTION_LOCATIONS: process.env.NOTION_LOCATIONS,
    GOOGLE_CLOUD: process.env.GOOGLE_CLOUD
  },
  target: 'serverless',
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  }
}
