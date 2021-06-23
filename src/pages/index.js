import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"

import Header from "../components/header"
import ExpositionActive from "../components/exposition_active"
import ExpositionArchive from "../components/exposition_archive"

const IndexPage = (props) => {
  // const [expoEntries, setExpoEntries] = useState([])
  const { allStrapiExposition: { nodes: expoEntries } } = props.data

  const [headerStyles, setHeaderStyles] = useState({})

  return (
    <>
      <Helmet>
        <title>{props.data.site.siteMetadata?.title || "Galerie Limbo"}</title>
        <meta name="author" content={props.data.site.siteMetadata?.description} />
        <meta name="description" content={props.data.site.siteMetadata?.description} />
        <meta name="keywords" content={props.data.site.siteMetadata?.keywords} />
      </Helmet>
      <Header headerStyles={headerStyles}></Header>
      <ExpositionActive expoEntries={expoEntries} setHeaderStyles={setHeaderStyles}></ExpositionActive>
      <ExpositionArchive expoEntries={expoEntries}></ExpositionArchive>
      {/*<Footer></Footer>*/}
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
    allStrapiExposition {
      nodes {
        strapiId
        id
        title
        address
        text_color_HEX
        background_color_HEX
        start_date
        end_date
        URL
        poster{
          childImageSharp {
              gatsbyImageData(
                width: 800
                layout: CONSTRAINED
                placeholder: BLURRED
                formats: [AUTO, WEBP, JPG]
               )
            }
        }
        image {
          id
          image_file {
            childImageSharp {
              gatsbyImageData(
                width: 2000
                layout: CONSTRAINED
                placeholder: BLURRED
                formats: [AUTO, WEBP, JPG]
               )
            }
          }
      }
        description
          artist {
            id
            biography
            name
            image {
              image_file {
                childImageSharp {
                  gatsbyImageData(
                    width: 2000
                    layout: CONSTRAINED
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, JPG]
                   )
                }
              }
            }
        }
      }
    }
  }
`
