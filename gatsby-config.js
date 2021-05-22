/* eslint-disable */
'use strict'

const siteConfig = require('./config.js')
const meta = siteConfig.siteMetadata
const manifest = siteConfig.siteManifest

module.exports = {
  siteMetadata: { ...meta },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `React`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-manifest`,
      options: { ...manifest },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: ['/'],
      },
    },
    `gatsby-plugin-emotion`,
    'gatsby-plugin-theme-ui',
    `gatsby-plugin-catch-links`,
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          },
          `gatsby-remark-autolink-headers`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
      __key: 'content',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/media`,
        name: 'images',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: siteConfig.googleAnalyticsId,
      },
    },
  ],
}
