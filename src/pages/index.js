import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

import '../../static/dark.css';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {posts.map(({ node }, index) => {
        const title = node.frontmatter.title || node.fields.slug
        
        return buildArticle(index % 6, title, node);
      })}      
      </div>
    </Layout>
  )
}

const getColClassname = (index) => {
  if (index === 0) {
    return 'col-md-12';
  } else if (index <= 3) {
    return 'col-md-4';
  } else {
    return 'col-md-6';
  }
}

const buildArticle = (index, title, node) => {
  if (index === 0) {
    return (
      <article key={node.fields.slug} className={`post col-xs-12 ${getColClassname(index)}`} style={{ padding: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'row'}}>
          <div className='col-md-7 col-xs-12'>
            { buildCoverImage(node) }
          </div>
          <div className='col-md-5 col-xs-12' style={{ padding: 16 }}>
            { buildHashtagGroup(node.frontmatter.hashtag) }
            { bulidHeader(title, node) }
            { buildDate(node) }
            { buildContentSection(node) }
          </div>
        </div>
      </article>
    )
  } else {
    return (
      <article key={node.fields.slug} className={`post col-xs-12 ${getColClassname(index)}`} style={{ padding: 8 }}>
        { buildCoverImage(node) }
        <header>
          { buildHashtagGroup(node.frontmatter.hashtag) }
          { bulidHeader(title, node) }
          { buildDate(node) }
        </header>
        { buildContentSection(node) }
      </article>
    );
  } 
}

const buildCoverImage = (node) => {
  return <Img
            fluid={node.frontmatter.cover.childImageSharp.fluid}
            imgStyle={{ objectFit: 'contain' }}
          />
}

const buildHashtagGroup = (hashtags) => {
  let tagToReturn = [];

  if (hashtags) {
    let listOfHashtags = hashtags.split(',');

    for (let i = 0; i < listOfHashtags.length; i++) {
      if (tagToReturn.length > 0) {
        tagToReturn.push(<span>+</span>);
      }

      tagToReturn.push(<Link style={{ margin: 2, boxShadow: 'none'}} to={`hashtag/${listOfHashtags[i]}`}>{listOfHashtags[i]}</Link>);
    }
  }

  return <div><small>{tagToReturn}</small></div>;
}

const bulidHeader = (title, node) => {
  return (
    <h3 style={{ marginTop: '0.5rem', marginBottom: rhythm(1/4) }}>
      <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>{title}</Link>
    </h3>
  )
}

const buildDate = (node) => {
  return <small>{node.frontmatter.date}</small>;
}

const buildContentSection = (node) => {
  return <section><p dangerouslySetInnerHTML={{ __html: node.excerpt }} /></section>;
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            hashtag
            cover {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
