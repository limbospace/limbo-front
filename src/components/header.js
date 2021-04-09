import React from "react"
import { Link } from "gatsby"

import * as headerStyles from "./header.module.sass"

const Header = (props) => {
  // function reload() {
  //   navigate(`/`)
  //   navigate(0)
  // }

  return (
    // <div className={headerStyles.header} onClick={reload}>
    <header className={headerStyles.header}>

      {/*<Link to={`/`} className={headerStyles.pageName}>Archive</Link>*/}
      {/*/!*<img src={'../assets/images/logo_black.svg'}/>*!/*/}
      {/*<Link to={`/`} className={headerStyles.logo}></Link>*/}
      {/*<Link to={`/`} className={headerStyles.pageName}>Info</Link>*/}
    </header>
  )
}

export default Header
