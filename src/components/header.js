import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"

import * as headerStyles from "./header.module.sass"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

const Header = (props) => {
  // function reload() {
  //   navigate(`/`)
  //   navigate(0)
  // }


  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  function getBrightness(color) {
    return Math.sqrt(
      color.r * color.r * .241 +
      color.g * color.g * .691 +
      color.b * color.b * .068)
  }


  const headerComponentRef = useRef(null)
  let [headerClassName, setHeaderClassName] = useState(headerStyles.displayed)
  let [logoClassName, setLogoClassName] = useState(headerStyles.logoBlack)
  let [linkClassName, setLinkClassName] = useState(headerStyles.pageLinkBlack)


  useEffect(() => {
    let prevScrollpos = window.pageYOffset
    window.onscroll = function() {
      let currentScrollPos = window.pageYOffset
      if (prevScrollpos > currentScrollPos) {
        setHeaderClassName(headerStyles.displayed)
      } else {
        setHeaderClassName(headerStyles.hidden)
      }
      prevScrollpos = currentScrollPos
    }

    //calculates color of the font displayed on the limbo logo
    let currentColor = hexToRgb(props.headerStyles.color)
    if (currentColor != null) {
      if(getBrightness(currentColor)>128){
        setLogoClassName(headerStyles.logoWhite)
        setLinkClassName(headerStyles.pageLinkWhite)
      }else{
        setLogoClassName(headerStyles.logoBlack)
        setLinkClassName(headerStyles.pageLinkBlack)
      }
    }
  })

  return (
    // <div className={headerStyles.header} onClick={reload}>
    <header ref={headerComponentRef} className={headerClassName} style={props.headerStyles}>

      <Link to={`/`} className={linkClassName}>Archive</Link>
      {/*<img src={'../assets/images/logo_black.svg'}/>*/}
      <Link to={`/`} className={logoClassName}></Link>
      <Link to={`/`} className={linkClassName}>Info</Link>
    </header>
  )
}

export default Header
