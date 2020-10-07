import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'
import { startCase, cloneDeep } from 'lodash'

const Posts = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const allImages = data.allFile.edges

  const { humanPageNumber, basePath } = pageContext
  const isFirstPage = humanPageNumber === 1
  let featuredPost
  let ogImage

  const convertFrontmatterImageToSharpImage = (frontmatterImage) => {
    const relativePath = frontmatterImage.slice(frontmatterImage.lastIndexOf('/') + 1)
    return allImages.find((image) => image.node.relativePath === relativePath).node.childImageSharp
  }

  const processedPosts = cloneDeep(posts)
  processedPosts.map((post) => {
    post.node.frontmatter.coverImage.url = convertFrontmatterImageToSharpImage(post.node.frontmatter.coverImage.url)
    return post
  })

  try {
    featuredPost = processedPosts[0]
  } catch (error) {
    featuredPost = null
  }
  try {
    ogImage = processedPosts[0].node.frontmatter.coverImage.url
  } catch (error) {
    ogImage = null
  }

  return (
    <Layout>
      <SEO title={startCase(basePath)} image={ogImage} />
      <Container>
        {isFirstPage ? (
          <CardList>
            <Card {...featuredPost} featured basePath={basePath} />
            {processedPosts.slice(1).map((post, index) => (
              <React.Fragment key={post.node.frontmatter.title + index}>
                <Card {...post} basePath={basePath} />
              </React.Fragment>
            ))}
          </CardList>
        ) : (
          <CardList>
            {processedPosts.map((post, index) => (
              <React.Fragment key={post.node.frontmatter.title + index}>
                <Card {...post} basePath={basePath} />
              </React.Fragment>
            ))}
          </CardList>
        )}
      </Container>
      <Pagination context={pageContext} />
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "POST" } }, frontmatter: { isDraft: { eq: false } } }
      sort: { fields: frontmatter___publishDate, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
            type
          }
          frontmatter {
            title
            publishDate(formatString: "DD-MMM-YYYY")
            coverImage {
              url
              label
            }
            tags
            metaDescription
          }
          html
          timeToRead
          excerpt(pruneLength: 80)
        }
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      edges {
        node {
          relativePath
          sourceInstanceName
          childImageSharp {
            fluid(maxWidth: 600, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`

export default Posts
