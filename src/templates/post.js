import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Container from '../components/Container'
import PageBody from '../components/PageBody'
import TagList from '../components/TagList'
import PostLinks from '../components/PostLinks'
import PostDetails from '../components/PostDetails'
import SEO from '../components/SEO'

const PostTemplate = ({ data, pageContext }) => {
  const {
    frontmatter: { title, metaDescription, coverImage, publishDate, tags },
    html,
    timeToRead,
    excerpt,
  } = data.markdownRemark
  const { childImageSharp } = data.file
  const tagsData = data.allMarkdownRemark.edges

  const processedTags = tags.map((tag) => {
    const tagData = tagsData.find((tagData) => tagData.node.frontmatter.title === tag)
    return {
      title: tag,
      slug: tagData.node.fields.slug,
    }
  })
  const previous = pageContext.prev
  const next = pageContext.next
  const { basePath } = pageContext

  let ogImage
  try {
    ogImage = coverImage.url
  } catch (error) {
    ogImage = null
  }

  return (
    <Layout>
      <SEO title={title} description={metaDescription ? metaDescription : excerpt} image={ogImage} />
      <Hero title={title} image={childImageSharp} height={'50vh'} />
      <Container>
        {processedTags && processedTags.length > 0 && <TagList tags={processedTags} basePath={basePath} />}
        <PostDetails date={publishDate} timeToRead={timeToRead} />
        <PageBody body={html} />
      </Container>
      <PostLinks previous={previous} next={next} basePath={basePath} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $coverImageRelativePath: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        publishDate(formatString: "DD-MMM-YYYY")
        coverImage {
          label
          url
        }
        tags
        metaDescription
      }
      html
      timeToRead
      excerpt(pruneLength: 80)
    }
    file(sourceInstanceName: { eq: "images" }, relativePath: { eq: $coverImageRelativePath }) {
      childImageSharp {
        gatsbyImageData(width: 1000, quality: 80, placeholder: BLURRED)
      }
      sourceInstanceName
      relativePath
    }
    allMarkdownRemark(filter: { fields: { type: { eq: "TAG" } } }) {
      edges {
        node {
          fields {
            slug
            type
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

export default PostTemplate
