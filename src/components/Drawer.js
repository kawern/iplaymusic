import { IoListCircleSharp, RiPlayList2Fill, MdWifiTethering, IoContrast, IoIosAlbums  } from 'react-icons/all'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from '@reach/router'
import { useState, useEffect } from 'react'

const style = css`
.drawer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: white;
    height: 4em;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.15);
-webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.15);
-moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.115);
}
li{
    font-size: 2em;
    line-height: 0em;
    margin-bottom: 0!important;
}
.big {
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 48px;
    background: -webkit-linear-gradient(#EE0979, orange);
    padding: 4px;
    border-radius: 1em;
    color: white;
}`

const Drawer = () => {
    const [ darkMode, setDarkMode ] = useState(false)
   
    useEffect(() => {
      const body = document.body
      
      // If dark mode is enabled - adds classes to update dark-mode styling.
      // Else, removes and styling is as normal.
      if( darkMode === true ) {
        body.classList.add('dark-mode')
      } else {
        body.classList.remove('dark-mode')
      }
    }, [darkMode])

    return ( <nav css={style}>

<svg width="0" height="0">
  <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
    <stop stopColor="#EE0979" offset="0%" />
    <stop stopColor="orange" offset="100%" />
  </linearGradient>
</svg>
    <div className="drawer">
    <Link to={"/albums"}>
            <li><IoIosAlbums style={{ fill: "url(#gradient)" }} /></li>
            </Link>
    <Link to={"/playlists"}>
        <li><RiPlayList2Fill style={{ fill: "url(#gradient)" }}/></li>
        </Link>
    <Link to={"/featured"}>
        <li className="big"><MdWifiTethering size={40}/></li>
        </Link>
        <Link to={"/categories"}>
        <li>
            <IoListCircleSharp size={37} style={{ fill: "url(#gradient)"}}/>
            </li>
        </Link>
        <li><IoContrast size={34}
        id="toggle"
        onClick={() => darkMode === false ? setDarkMode(true) : setDarkMode(false)}
        style={{ fill: "url(#gradient)" }}/></li>
    </div></nav> );
}
 
export default Drawer;