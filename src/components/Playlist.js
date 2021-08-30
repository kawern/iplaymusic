/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link, useParams } from '@reach/router'
import { AiFillPlayCircle } from 'react-icons/ai'

    const Playlist = () => {

        const { token } = useContext(TokenContext)    
        const [playlist, setPlaylist] = useState();
        const [tracks, setTracks] = useState();

        const { id } = useParams()
    
        useEffect(() => {
            if(token) {
            axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
                headers: {
                    "Authorization": token
                }
            })
        .then(response => setPlaylist(response.data))
    }
    }, [token])

    useEffect(() => {
        if(token) {
        axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            headers: {
                "Authorization": token
            }
        })
    .then(response => setTracks(response.data.items))
}
}, [token])
    
    const style = css `
    .track {
  border-collapse: collapse;
  width: 100%;
  width: 325px;
}

.track td {
  padding: 8px;
}
.track td:last-child {
  width: 5%;
  text-align: center;
  font-weight: lighter;
}
.track td:first-of-type {
  width: 5%;
  text-align: center;
}
.track td p {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.track td p:nth-child(2) {
    font-size: 12px;
}
 img {
max-width: 325px;
}
    `

    playlist && console.log(playlist)
    return (
    <div css={style} >
        <div className="albumTop">
<img src={playlist && playlist.images[0].url} alt="album cover"/>
    </div>

        { tracks?.map(track => (
        // eslint-disable-next-line
    <table className="track">
        <tbody>
                <tr>
                    <td><AiFillPlayCircle size={36}/></td>
                    <td>
                        <p>{track.track.name}</p>
                        <p>{track.track.artists[0].name}</p>
                        </td>
                    <td>2:35</td>
                </tr>
                </tbody>
</table>
    ))}
    </div>
    );
}
 
export default Playlist;