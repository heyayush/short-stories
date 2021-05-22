import React from 'react'
import { graphql } from 'gatsby'
import { startCase, cloneDeep } from 'lodash'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Card from '../components/Card'
import CardList from '../components/CardList'
import PageTitle from '../components/PageTitle'
import Pagination from '../components/Pagination'
import Container from '../components/Container'

const TagTemplate = ({ data, pageContext }) => {
  const posts = pageContext.specificTagPosts
  const allImages = data.allFile.edges
  const { title } = data.markdownRemark.frontmatter
  const numberOfPosts = posts.length
  const skip = pageContext.skip
  const limit = pageContext.limit
  const { humanPageNumber, basePath } = pageContext

  const convertFrontmatterImageToSharpImage = (frontmatterImage) => {
    const relativePath = frontmatterImage.slice(frontmatterImage.lastIndexOf('/') + 1)
    return allImages.find((image) => image.node.relativePath === relativePath).node.childImageSharp
  }

  const processedPosts = cloneDeep(posts)
  processedPosts.map((post) => {
    post.node.frontmatter.coverImage.url = convertFrontmatterImageToSharpImage(post.node.frontmatter.coverImage.url)
    return post
  })

  let ogImage
  try {
    ogImage = processedPosts[0].node.frontmatter.coverImage.url
  } catch (error) {
    ogImage = null
  }

  return (
    <React.Fragment>
      <Layout>
        <SEO title={`Tag: ${startCase(title)}`} description={`Posts Tagged: ${startCase(title)}`} image={ogImage} />
        <Container>
          <PageTitle small>
            {numberOfPosts} Posts Tagged: &ldquo;
            {title}
            &rdquo;
          </PageTitle>
          <CardList>
            {processedPosts.slice(skip, limit * humanPageNumber).map((post, index) => (
              <React.Fragment key={post.node.frontmatter.title + index}>
                <Card {...post} basePath={basePath} />
              </React.Fragment>
            ))}
          </CardList>
        </Container>
        <Pagination context={pageContext} />
      </Layout>
    </React.Fragment>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      edges {
        node {
          relativePath
          sourceInstanceName
          childImageSharp {
            gatsbyImageData(width: 500, quality: 60, placeholder: BLURRED)
          }
        }
      }
    }
  }
`

export default TagTemplate
