import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"

import Header from "../components/header"

const IndexPage = (props) => {
  return (
    <>
      <Helmet>
        <title>{props.data.site.siteMetadata?.title || "Galerie Limbo"}</title>
        <meta name="author" content={props.data.site.siteMetadata?.description} />
        <meta name="description" content={props.data.site.siteMetadata?.description} />
        <meta name="keywords" content={props.data.site.siteMetadata?.keywords} />
      </Helmet>
      <Header>
      </Header>
      <div>Hello World</div>
    </>
  )

}
export default IndexPage

export const query = graphql`
  query{
    site {
      siteMetadata {
        title
        author
        description
        keywords
      }
    }
  }
`
