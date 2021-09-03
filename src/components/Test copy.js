/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link, useParams } from '@reach/router'
import { AiFillPlayCircle } from 'react-icons/ai'
import './Tracks.scss'

    const Test = () => {
        const { token } = useContext(TokenContext)    
        const [albums, setAlbums] = useState();
        const [playlist, setPlaylist] = useState();

        useEffect(() => {
            if(token) {
            axios.get(`https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF/tracks?offset=0&limit=10`, {
                headers: {
                    "Authorization": token
                }
            })
        .then(response => setAlbums(response.data.items))
    }
    
    }, [token])
    const handleClick = value => async() => {
        axios.get(`https://api.spotify.com/v1/albums/${value}`, {
          headers: {
              "Authorization": token
          }
      })
      .then(response => setPlaylist(response.data))
      }

    const style = css `
    .PlaylistSlider__container {
        max-width: 325px;
    }
.PlaylistSlider_slides {
  overflow: auto;
  white-space: nowrap;
& a {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  color: black;
}
}
ul {
    display: flex;
}
li {
    margin-right: 10px;
&  img {
max-width: 155px;
}
}
    `
    function correctDuration(ms) {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + ((seconds < 10) ? '0' : '') + seconds;
    }

    playlist && console.log(playlist)
    return (

<div css={style} >
        <h1>Albums</h1>
        <div className="PlaylistSlider__container">
<div className="PlaylistSlider_slides">
<b>Featured Albums</b>
<ul>
    { albums?.map(album => (
            <li onClick={handleClick(album.track.album.id)}>
<linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
    <stop stopColor="#EE0979" offset="0%" />
    <stop stopColor="orange" offset="100%" />
  </linearGradient>
                <img
                src={album.track.album.images[0].url} alt="test" />
                <p>{album.track.album.name.substring(0, 18)}</p>
                <p>{album.track.artists[0].name}</p>
                </li>
    ))}</ul>
</div>
{playlist && playlist.name}

<table className="track">
        <tbody>
        {playlist && playlist.tracks.items.map(tracks => (
                <tr>
                    <td><Link to={`/player/${tracks.id}`}><AiFillPlayCircle size={36} style={{ fill: "url(#gradient)" }}/></Link></td>
                    <td>
                        <p>{tracks.name}</p>
                        <p>{playlist.artists[0].name}</p>
                        </td>
                    <td>{correctDuration(tracks.duration_ms)}</td>
                </tr>
                ))}
                </tbody>
</table>
</div>
        </div>
    );
}
 
export default Test;