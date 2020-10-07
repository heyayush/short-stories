'use strict'

module.exports = {
  siteMetadata: {
    title: 'My Dreams | Personal blog of John Sharma',
    description: 'Blog of John Sharma from Ujjain',
    author: 'John Sharma',
    favicon: '/logo.png',
    siteUrl: 'https://heyayush.com',
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
    basePath: '/',
  },
  siteManifest: {
    name: 'John Sharma',
    short_name: 'John Ujjaini',
    description: 'Personal blog John Sharma from Ujjain aka John Ujjaini',
    start_url: '/',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    display: 'standalone',
    lang: 'en',
    icon: 'static/logo.jpg',
  },
}
