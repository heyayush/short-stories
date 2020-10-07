/* eslint-disable */
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const config = require('./config')
const { paginate } = require(`gatsby-awesome-pagination`)

const NODE_TYPES = {
  POST: 'POST',
  PAGE: 'PAGE',
  TAG: 'TAG',
}

const query = {
  posts: `
  query AllPostsQuery {
    allMarkdownRemark(filter: {fields: {type: {eq: "POST"}}, frontmatter: {isDraft: {eq: false}}}, sort: {fields: frontmatter___publishDate, order: DESC}) {
      edges {
        node {
          fields {
            type
            slug
          }
          frontmatter {
            isDraft
            title
            publishDate(formatString: "DD-MMM-YYYY")
            coverImage {
              label
              url
            }
            tags
          }
        }
      }
    }
  }
`,
  pages: `
  query AllPagesQuery {
    allMarkdownRemark(filter: {fields: {type: {eq: "PAGE"}}, frontmatter: {isDraft: {eq: false}}}) {
      edges {
        node {
          fields {
            type
            slug
          }
          frontmatter {
            isDraft
            title
          }
        }
      }
    }
  }
`,
  tags: `
    query AllTagsQuery {
      allMarkdownRemark(filter: {fields: {type: {eq: "TAG"}}}) {
        edges {
          node {
            fields {
              type
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `,
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const relativePath = fileNode.relativePath
    let slug
    let type
    if (relativePath.includes('posts/')) {
      slug = createFilePath({ node, getNode, basePath: `content/posts` })
      type = NODE_TYPES.POST
    }
    if (relativePath.includes('pages/')) {
      slug = createFilePath({ node, getNode, basePath: `content/pages` })
      type = NODE_TYPES.PAGE
    }
    if (relativePath.includes('tags/')) {
      slug = createFilePath({ node, getNode, basePath: `content/tags`, trailingSlash: false })
      type = NODE_TYPES.TAG
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
    createNodeField({
      node,
      name: 'type',
      value: type,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const basePath = config.siteMetadata.basePath || '/'

  // Create a page for each "post"
  const postsQuery = await graphql(query.posts)
  const posts = postsQuery.data.allMarkdownRemark.edges
  posts.forEach((post, i) => {
    const next = i === posts.length - 1 ? null : posts[i + 1].node
    const prev = i === 0 ? null : posts[i - 1].node

    const imageUrl = post.node.frontmatter.coverImage.url
    const coverImageRelativePath = imageUrl.slice(imageUrl.lastIndexOf('/') + 1)

    createPage({
      path: `${basePath === '/' ? '' : basePath}${post.node.fields.slug}`,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        slug: post.node.fields.slug,
        type: post.node.fields.type,
        basePath: basePath === '/' ? '' : basePath,
        prev,
        next,
        coverImageRelativePath,
      },
    })
  })

  // Create a page containing all "posts" and paginate.
  paginate({
    createPage,
    component: path.resolve(`./src/templates/posts.js`),
    items: posts,
    itemsPerFirstPage: config.siteMetadata.postsPerFirstPage || 7,
    itemsPerPage: config.siteMetadata.postsPerPage || 6,
    pathPrefix: basePath,
    context: {
      basePath: basePath === '/' ? '' : basePath,
      paginationPath: basePath === '/' ? '' : `/${basePath}`,
    },
  })

  // Create "tag" page and paginate
  const tagsQuery = await graphql(query.tags)
  const tags = tagsQuery.data.allMarkdownRemark.edges

  tags.forEach((tag, i) => {
    const tagPagination = basePath === '/' ? tag.node.fields.slug : `/${basePath}${tag.node.fields.slug}`

    const specificTagPosts = posts.filter((post) => post.node.frontmatter.tags.includes(tag.node.frontmatter.title))

    paginate({
      createPage,
      component: path.resolve(`./src/templates/tag.js`),
      items: specificTagPosts || [],
      itemsPerPage: config.siteMetadata.postsPerPage || 6,
      pathPrefix: tagPagination,
      context: {
        slug: tag.node.fields.slug,
        type: tag.node.fields.type,
        basePath: basePath === '/' ? '' : basePath,
        paginationPath: tagPagination,
        specificTagPosts,
      },
    })
  })

  // Create a page for each "page"
  const pagesQuery = await graphql(query.pages)
  const pages = pagesQuery.data.allMarkdownRemark.edges
  pages.forEach((page, i) => {
    createPage({
      path: page.node.fields.slug.replace('pages/', ''),
      component: path.resolve(`./src/templates/page.js`),
      context: {
        slug: page.node.fields.slug,
        type: page.node.fields.type,
      },
    })
  })
}
