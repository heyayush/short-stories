import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import PageBody from '../components/PageBody'
import SEO from '../components/SEO'

const PageTemplate = ({ data }) => {
  const {
    frontmatter: { title, metaDescription },
    html,
    excerpt,
  } = data.markdownRemark
  return (
    <Layout>
      <SEO title={title} description={metaDescription ? metaDescription : excerpt} />
      <Container>
        <PageTitle>{title}</PageTitle>
        <PageBody body={html} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        metaDescription
      }
      html
      excerpt(pruneLength: 80)
    }
  }
`

export default PageTemplate
