import React, { useEffect } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as expositionStyles from "../templates/exposition.module.sass"
import { Link } from "gatsby"


const ExpositionActive = (props) => {
  let activeExpositions = []
  let expositionColorStyles

  for (let currentExpo of props.expoEntries) {
    expositionColorStyles = {
      color: currentExpo.text_color_HEX,
      backgroundColor: currentExpo.background_color_HEX
    }


    let currentDate = new Date()
    let startDate = Date.parse(currentExpo.start_date)
    let endDate = Date.parse(currentExpo.end_date)
    console.log(currentExpo.title)
    console.log(currentDate)
    console.log(startDate)
    console.log(endDate)


    if (currentDate <= endDate) {//if the exhibition is not finished yet

      let formattedDate
      if (startDate !== endDate) {
        formattedDate = `${currentExpo.start_date.substring(8, 10)}.${currentExpo.start_date.substring(5, 7)} - ${currentExpo.end_date.substring(8, 10)}.${currentExpo.end_date.substring(5, 7)}.${currentExpo.end_date.substring(2, 4)}`
      } else {
        formattedDate = `${currentExpo.end_date.substring(8, 10)}.${currentExpo.end_date.substring(5, 7)}.${currentExpo.end_date.substring(2, 4)}`
      }


      let formattedImageFirst = []
      let formattedImagesRest = []
      for (let i = 0; i < currentExpo.image.length; i++) {
        if (i == 0 && currentExpo.image.length > 0) {
          formattedImageFirst.push(<GatsbyImage image={getImage(currentExpo.image[i].image_file)} alt={""} className={expositionStyles.mainImage} />)
        }
        if (i > 0 && currentExpo.image.length > 1) {
          formattedImagesRest.push(<GatsbyImage image={getImage(currentExpo.image[i].image_file)} alt={""} className={expositionStyles.mainImage} />)
        }
      }

      let formattedArtists = []
      let artistsList = []
      for (let currentArtist of currentExpo.artist) {
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


      activeExpositions.push(<div key={currentExpo.strapiId} className={expositionStyles.expositionContainer} style={expositionColorStyles}>
        <div className={`${expositionStyles.infoContainer} `} style={expositionColorStyles}>
          <div className={expositionStyles.titleContainer}>
            <h1 className={expositionStyles.title}>{currentExpo.title}</h1>
            <h2 className={expositionStyles.date}>{formattedDate}</h2>
            <h3 className={expositionStyles.address}>{currentExpo.address}</h3>
          </div>
          {formattedImageFirst}
        </div>
        <div className={expositionStyles.descriptionContainer} style={expositionColorStyles}>
          <p className={expositionStyles.description}>{currentExpo.description}</p>
          {formattedImagesRest}
        </div>
        <div style={expositionColorStyles}>
          {formattedArtists}
        </div>
        <Link className={expositionStyles.posterLinkWrapper} to={`/${currentExpo.URL}`}>
          <div className={expositionStyles.posterContainer}>
            <GatsbyImage image={getImage(currentExpo.poster)} alt={""} className={expositionStyles.posterImage} />
            <h4>{currentExpo.title}</h4>
            <h4>{formattedDate}</h4>
            {/*{artistsList}*/}
          </div>
        </Link>
      </div>)
      break
    }

    //as it's made to have only one active exhibition at the time

  }


  //use the empty array to avoid the loop, thanks to
  // https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffect

  //to have multiple, it's needed to have the colors as an array and to get this instead of set this
  useEffect(() => {
    props.setHeaderStyles(expositionColorStyles)
  }, [])


  return (
    <>
      {activeExpositions}
    </>
  )

}

export default ExpositionActive

