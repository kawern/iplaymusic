import { BiEqualizer, IoIosMicrophone, MdWifiTethering, WiMoonAltThirdQuarter, IoSettingsSharp  } from 'react-icons/all'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from '@reach/router'


const Drawer = () => {

    const style = css`
    ul {
        display: flex;
        justify-content: space-around;
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
    li {
        font-size: 2em;
        line-height: 0em;
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
    }`
    return ( <nav css={style}>

<svg width="0" height="0">
  <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
    <stop stopColor="#EE0979" offset="0%" />
    <stop stopColor="orange" offset="100%" />
  </linearGradient>
</svg>
    <ul>
    <Link to={"/albums"}>
            <li><BiEqualizer style={{ fill: "url(#gradient)" }} /></li>
            </Link>
    <Link to={"/categories"}>
        <li><IoIosMicrophone style={{ fill: "url(#gradient)" }}/></li>
        </Link>
    <Link to={"/featured"}>
        <li className="big"><MdWifiTethering size={40} style={{ fill: "white"}}/></li>
        </Link>
        <li><WiMoonAltThirdQuarter style={{ fill: "url(#gradient)" }}/></li>
        <li><IoSettingsSharp style={{ fill: "url(#gradient)"}}/></li>
    </ul></nav> );
}
 
export default Drawer;