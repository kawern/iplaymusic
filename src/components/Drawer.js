import { IoListCircleSharp, RiPlayList2Fill, MdWifiTethering, IoIosAlbums  } from 'react-icons/all'
/** @jsxImportSource @emotion/react */
import { Link } from '@reach/router'
import DarkMode from './DarkMode'
import './Drawer.scss'

const Drawer = () => {
    return (
    <nav className="drawer">

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
        <li>
        <DarkMode />
        </li>
    </div></nav> );
}
 
export default Drawer;