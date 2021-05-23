import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query siteMetaData {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
            menuLinks {
              name
              slug
            }
            googleSheetsAPI
            contactFormSpreadsheetId
            contactFormEmailAPI
            contactToEmailAddress
            contactFromEmailAddress
          }
        }
      }
    `
  )
  return site.siteMetadata
}
