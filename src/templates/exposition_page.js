import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"
import Helmet from "react-helmet"
import ReactMarkdown from "react-markdown"
import Exposition from "../components/exposition"

import Header from "../components/header"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as expositionStyles from "./exposition.module.sass"



const ExpositionPage = (props) => {
  let exposition = props.data.strapiExposition
  let expositionColorStyles = {
    color: exposition.text_color_HEX,
    backgroundColor: exposition.background_color_HEX
  }

  return (
    <>
      <Helmet>
        <title>{props.data.strapiExposition.title || "Galerie Limbo"}</title>
        <meta name="author" content={props.data.site.siteMetadata?.description} />
        <meta name="description" content={props.data.site.siteMetadata?.description} />
        <meta name="keywords" content={props.data.site.siteMetadata?.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header headerStyles={expositionColorStyles}></Header>
      <Exposition currentExpo={exposition}></Exposition>
    </>
  )

}
export default ExpositionPage

export const query = graphql`
query ($URL: String!) {
  strapiExposition(URL: { eq: $URL }) {
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
