import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"


import * as expositionArchiveStyles from "./exposition_archive.module.sass"
import * as expositionStyles from "../templates/exposition.module.sass"


const ExpositionArchive = (props) => {
  let archiveExpositions = []

  for (let currentExpo of props.expoEntries) {
    let currentDate = new Date()
    let startDate = Date.parse(currentExpo.start_date)
    let endDate = Date.parse(currentExpo.end_date)


    if (currentDate > endDate) {//if the exhibition is finished yed
      let formattedDate
      if (startDate !== endDate) {
        formattedDate = `${currentExpo.start_date.substring(8, 10)}.${currentExpo.start_date.substring(5, 7)} - ${currentExpo.end_date.substring(8, 10)}.${currentExpo.end_date.substring(5, 7)}.${currentExpo.end_date.substring(2, 4)}`
      } else {
        formattedDate = `${currentExpo.end_date.substring(8, 10)}.${currentExpo.end_date.substring(5, 7)}.${currentExpo.end_date.substring(2, 4)}`
      }


      let artistsList = []
      for (let currentArtist of currentExpo.artist) {
        artistsList.push(<h4 key={currentArtist.id}>{currentArtist.name}</h4>)
      }
      console.log(`/${currentExpo.URL}`)

      archiveExpositions.push(<div key={currentExpo.strapiId} className={expositionStyles.expositionContainer}>
        <Link className={expositionStyles.posterLinkWrapper} to={`/${currentExpo.URL}`}>
          <div className={expositionStyles.posterContainer}>
            <GatsbyImage image={getImage(currentExpo.poster)} alt={""} className={expositionStyles.posterImage} />
            <h4>{currentExpo.title}</h4>
            <h4>{formattedDate}</h4>
            {artistsList}
          </div>
        </Link>
      </div>)
    }
  }
  return (
    <>
      {archiveExpositions}
    </>
  )
}

export default ExpositionArchive
