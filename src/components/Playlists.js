/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import './Tracks.scss'
import wave from "./images/playlist-wave.png";
import Drawer from './Drawer';
import { Link } from '@reach/router'
import { AiFillPlayCircle } from 'react-icons/ai'
import Spinner from './Spinner';
import LazyLoad from 'react-lazyload';
import "animate.css"
import TopBar from './TopBar';

    const Playlists = () => {
        const { token } = useContext(TokenContext)    
        const [playlists, setPlaylists] = useState();
        const [playlist, setPlaylist] = useState();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            if(token) {
            axios.get(`https://api.spotify.com/v1/browse/categories/toplists/playlists?country=DK`, {
                headers: {
                    "Authorization": token
                }
            })
        .then(response => setPlaylists(response.data.playlists.items))
        setLoading(false)
    }
    
    }, [token])
    const handleClick = value => async() => {
        axios.get(`https://api.spotify.com/v1/playlists/${value}`, {
          headers: {
              "Authorization": token
          }
      })
      .then(response => setPlaylist(response.data))
      setLoading(false)
      }

    const style = css `
    margin-bottom: 3em;
    .playlist_top {
        background-image: url(${wave});
        background-repeat: no-repeat;
        background-size: cover;
width: 100vw;
    }
    .playlist_header {
        text-align: center;
        font-weight: bold;
    }
    .PlaylistSlider__container {
display: flex;
margin: 0 30px;
margin-bottom: 30px;
    }
.PlaylistSlider_slides {
  overflow: auto;
  white-space: nowrap;
  padding-bottom: 10px;
& a {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  color: black;
}
&
ul {
    display: flex;
}
& li {
    margin-right: 20px;
    text-align: center;
    font-weight: bold;
}
& img {
max-width: 155px;
border-radius: 8px;
-webkit-box-shadow: 10px 10px 11px 0px rgba(0,0,0,0.15); 
box-shadow: 10px 10px 11px 0px rgba(0,0,0,0.15);
}
}
    `
    function correctDuration(ms) {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + ((seconds < 10) ? '0' : '') + seconds;
    }

    return loading ? <Spinner/> : (

<div css={style} className="animate__animated animate__fadeIn">
<TopBar/>
    <div className="playlist_top animate__animated animate__fadeIn">
        <h2 className="playlist">Playlists</h2>
        <div className="PlaylistSlider__container">
<div className="PlaylistSlider_slides">
<ul>
    { playlists?.map(playlist => (
        
            <li onClick={handleClick(playlist.id)}>
                 <LazyLoad throttle={150} height={155}>
                <img
                src={playlist.images[0].url} alt={playlist.name} />
                </LazyLoad>
                
                </li>
    ))}</ul>
</div></div></div>

<div className="playlist_header">{playlist && playlist.name}</div>
<table className="track ">
        <tbody>
        {playlist?.tracks.items.map(list => (
                <tr>
                    <td><Link to={`/player/${list.track.id}`}><AiFillPlayCircle size={36} style={{ fill: "url(#gradient)" }}/></Link></td>
                    <td>
                        <p>{list.track.name}</p>
                        <p>{list.track.artists[0].name}</p>
                        </td>
                    <td>{correctDuration(list.track.duration_ms)}</td>
                </tr>
                ))}
                </tbody>
</table>
<Drawer/>
        </div>
    );
}
 
export default Playlists;