import React, { useEffect } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Exposition from "./exposition"


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


    if (currentDate <= endDate) {//if the exhibition is not finished yet
      activeExpositions.push(<Exposition currentExpo={currentExpo} key={currentExpo.strapiID}></Exposition>)
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

