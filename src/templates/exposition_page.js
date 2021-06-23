import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"
import Helmet from "react-helmet"

import Header from "../components/header"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as expositionStyles from "./exposition.module.sass"


const ExpositionPage = (props) => {
  let exposition = props.data.strapiExposition
  let expositionColorStyles = {
    color: exposition.text_color_HEX,
    backgroundColor: exposition.background_color_HEX
  }


  let currentDate = new Date()
  let startDate = Date.parse(exposition.start_date)
  let endDate = Date.parse(exposition.end_date)


  let formattedDate
  if (startDate !== endDate) {
    formattedDate = `${exposition.start_date.substring(8, 10)}.${exposition.start_date.substring(5, 7)} - ${exposition.end_date.substring(8, 10)}.${exposition.end_date.substring(5, 7)}.${exposition.end_date.substring(2, 4)}`
  } else {
    formattedDate = `${exposition.end_date.substring(8, 10)}.${exposition.end_date.substring(5, 7)}.${exposition.end_date.substring(2, 4)}`
  }


  let formattedImageFirst = []
  let formattedImagesRest = []
  for (let i = 0; i < exposition.image.length; i++) {
    if (i == 0 && exposition.image.length > 0) {
      formattedImageFirst.push(<GatsbyImage image={getImage(exposition.image[i].image_file)} alt={""} className={expositionStyles.mainImage} />)
    }
    if (i > 0 && exposition.image.length > 1) {
      formattedImagesRest.push(<GatsbyImage image={getImage(exposition.image[i].image_file)} alt={""} className={expositionStyles.mainImage} />)
    }
  }

  let formattedArtists = []
  let artistsList = []
  for (let currentArtist of exposition.artist) {
    artistsList.push(<h4 key={currentArtist.id}>{currentArtist.name}</h4>)
    let artistImages = []
    for (let currentArtistImage of currentArtist.image) {
      artistImages.push(
        <GatsbyImage image={getImage(currentArtistImage.image_file)} alt={""} className={expositionStyles.artistImageSmall} key={currentArtistImage.id} />
      )
    }
    formattedArtists.push(
      <div className={expositionStyles.artistContainer} key={currentArtist.id}>
        <h3 className={expositionStyles.artistName}>{currentArtist.name}</h3>
        <p className={expositionStyles.artistBio}>{currentArtist.biography}</p>
        {artistImages}
      </div>
    )
  }


  return (
    <>
      <Helmet>
        <title>{props.data.strapiExposition.title || "Galerie Limbo"}</title>
        <meta name="author" content={props.data.site.siteMetadata?.description} />
        <meta name="description" content={props.data.site.siteMetadata?.description} />
        <meta name="keywords" content={props.data.site.siteMetadata?.keywords} />
      </Helmet>
      <Header headerStyles={expositionColorStyles}></Header>
      <div key={exposition.strapiId} className={expositionStyles.expositionContainer} style={expositionColorStyles}>
        <div className={`${expositionStyles.infoContainer} `} style={expositionColorStyles}>
          <div className={expositionStyles.titleContainer}>
            <h1 className={expositionStyles.title}>{exposition.title}</h1>
            <h2 className={expositionStyles.date}>{formattedDate}</h2>
            <h3 className={expositionStyles.address}>{exposition.address}</h3>
          </div>
          {formattedImageFirst}
          {/*<GatsbyImage image={getImage(exposition.image[0].image_file)} alt={""} className={expositionStyles.mainImage} />*/}
        </div>
        <div className={expositionStyles.descriptionContainer} style={expositionColorStyles}>
          <p className={expositionStyles.description}>{exposition.description}</p>
          <div></div>
          {formattedImagesRest}
        </div>
        <div style={expositionColorStyles}>
          {formattedArtists}
        </div>
        <Link className={expositionStyles.posterLinkWrapper} to={`/${exposition.URL}`}>
          <div className={expositionStyles.posterContainer}>
            <GatsbyImage image={getImage(exposition.poster)} alt={""} className={expositionStyles.posterImage} />
            <h4>{exposition.title}</h4>
            <h4>{formattedDate}</h4>
            {artistsList}
          </div>
        </Link>
      </div>
    </>
  )

}
export default ExpositionPage

export const query = graphql`
  query ($URL: String!) {
    strapiExposition(URL: {eq: $URL}) {
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
