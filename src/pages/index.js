import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"

import Header from "../components/header"
import ExpositionActive from "../components/exposition_active"
import ExpositionArchive from "../components/exposition_archive"

const IndexPage = (props) => {
  // window.location.href = "/terrainvagues"
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
query {
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
      indications
      poster {
        childImageSharp {
          gatsbyImageData(
            width: 800
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, JPG]
          )
        }
      }
      main_picture {
        id
        childImageSharp {
          gatsbyImageData(
            width: 2000
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, JPG]
          )
        }
      }
      big_picture_1 {
        id
        childImageSharp {
          gatsbyImageData(
            width: 2000
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, JPG]
          )
        }
      }
      big_picture_2 {
        id
        childImageSharp {
          gatsbyImageData(
            width: 2000
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, JPG]
          )
        }
      }
      description
      gallery_image {
        id
        artist_name
        artwork_title
        artwork_materials
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

`
