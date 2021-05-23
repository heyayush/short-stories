/* eslint-disable */
'use strict'

const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development'

require('dotenv').config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: 'Short stories collection | Blog by Ayush Sharma',
    description: 'Blog by Ayush Sharma for collecting short stories',
    author: 'Ayush Sharma',
    favicon: '/logo.png',
    image: '/images/share.jpg',
    menuLinks: [
      {
        name: 'Home',
        slug: '/',
      },
      {
        name: 'About',
        slug: '/about/',
      },
      {
        name: 'Contact',
        slug: '/contact/',
      },
    ],
    postsPerFirstPage: 7,
    postsPerPage: 6,
    siteUrl: 'https://kahaniyaan.netlify.app',
    googleSheetsAPI: process.env.GOOGLE_SHEETS_API,
    contactFormSpreadsheetId: process.env.CONTACT_FORM_SPREADSHEET_ID,
    contactFormEmailAPI: process.env.CONTACT_FORM_EMAIL_API,
    contactToEmailAddress: process.env.CONTACT_TO_EMAIL_ADDRESS,
    contactFromEmailAddress: process.env.CONTACT_FROM_EMAIL_ADDRESS,
  },
  siteManifest: {
    name: 'Short Stories',
    short_name: 'Short Stories',
    description: 'Blog by Ayush Sharma for collecting short stories',
    start_url: '/',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    display: 'standalone',
    lang: 'en',
    icon: 'static/logo.png',
  },
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS,
}
