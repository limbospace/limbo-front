import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"

import Header from "../components/header"
import { Link } from "gatsby"

import * as infoStyles from "../styles/info.module.sass"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

import ReactMarkdown from "react-markdown"

import FacebookSVG from "../assets/images/facebook.svg";
import InstagramSVG from "../assets/images/instagram.svg";


const InfoPage = (props) => {
  const [headerStyles, setHeaderStyles] = useState({})

  const { allStrapiInfo: { nodes: infos } } = props.data
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
      <div className={infoStyles.principalInfos}>
        <div className={infoStyles.infoBlock}>
          <p>{infos[0].address_road}</p>
          <p>{infos[0].address_city}</p>
          <br />
          <Link to="mailto:contact@limbospace.ch" className={infoStyles.mailLink}><p>{infos[0].address_mail}</p></Link>
          <p><Link to="https://www.instagram.com/limbo.space.ch/"><FacebookSVG /></Link>
          <Link to="https://www.instagram.com/limbo.space.ch/"><InstagramSVG /></Link></p>
        </div>

        {/*<GatsbyImage className={infoStyles.infoImage} image={getImage(infos[0].info_image)}></GatsbyImage>*/}
      </div>
      {/*<div className={infoStyles.infoImageContainer}>*/}
      {/*  /!* <StaticImage src="../assets/images/limbo-info.jpg"></StaticImage> *!/*/}
      {/*  /!* <GatsbyImage className={infoStyles.infoImage} image={getImage(infos[0].info_image)}></GatsbyImage> *!/*/}
      {/*</div>*/}
      <div className={infoStyles.infoTextContainer}>
        <ReactMarkdown className={infoStyles.infoText}>{infos[0].info_text}</ReactMarkdown>
      </div>
      {/*<Footer></Footer>*/}
    </>
  )

}
export default InfoPage

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
  allStrapiInfo {
    nodes {
      address_city
      address_mail
      address_road
      id
      strapiId
      info_text
      info_image {
        childImageSharp{
            gatsbyImageData(
                width: 800
                layout: CONSTRAINED
                placeholder: BLURRED
                formats: [AUTO, WEBP, JPG]
              )
        }
      }
    }
  }
}
`