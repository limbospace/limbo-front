import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"

import * as headerStyles from "./header.module.sass"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import LogoBlackSVG from "../assets/images/logo_black.svg";
import LogoWhiteSVG from "../assets/images/logo_white.svg";


const Header = (props) => {
  const [pageWidth, setPageWidth] = useState(0)

  useEffect(() => {
    setPageWidth(window.innerWidth)
    window.addEventListener("resize", () => {
      setPageWidth(window.innerWidth)
    })
    return () => {
      window.removeEventListener("resize", () => {
      })
    }
  }, [])


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
  let [linkClassName, setLinkClassName] = useState(headerStyles.pageLinkBlack)
  let [logoBlackClassName, setLogoBlackClassName] = useState(headerStyles.logoDisplayed)
  let [logoWhiteClassName, setLogoWhiteClassName] = useState(headerStyles.logoHidden)



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
        setLogoBlackClassName(headerStyles.logoHidden)
        setLogoWhiteClassName(headerStyles.logoDisplayed)
        setLinkClassName(headerStyles.pageLinkWhite)
      }else{
        setLogoBlackClassName(headerStyles.logoDisplayed)
        setLogoWhiteClassName(headerStyles.logoHidden)
        setLinkClassName(headerStyles.pageLinkBlack)
      }
    }
  })

  let expositionText= pageWidth >= 720 ? "Expositions" : "Expos"

  return (
    <header ref={headerComponentRef} className={headerClassName} style={props.headerStyles}>

      <Link to={`/`} className={linkClassName}>{expositionText}</Link>
      <Link to={`/`} className={headerStyles.logo}><LogoBlackSVG className={logoBlackClassName}/><LogoWhiteSVG className={logoWhiteClassName}/></Link>
      <Link to={`/info`} className={linkClassName}>Info</Link>

    </header>
  )
}

export default Header
