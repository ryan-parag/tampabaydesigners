require('dotenv').config();

module.exports = {
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE: process.env.AIRTABLE_BASE
  },
  target: 'serverless',
}
