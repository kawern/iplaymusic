/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link, useParams } from '@reach/router'
import { AiFillPlayCircle } from 'react-icons/ai'
import Drawer from './Drawer';

    const Album = () => {

        const { token } = useContext(TokenContext)    
        const [album, setAlbum] = useState();
        const [tracks, setTracks] = useState();

        const { id } = useParams()
    
        useEffect(() => {
            if(token) {
            axios.get(`https://api.spotify.com/v1/albums/${id}`, {
                headers: {
                    "Authorization": token
                }
            })
        .then(response => setAlbum(response.data))
    }
    }, [token])

    useEffect(() => {
        if(token) {
        axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
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
 img {
max-width: 325px;
}
    `

    tracks && console.log(album)
    return (
    <div css={style} >
        <div className="albumTop">
<img src={album && album.images[0].url} alt="album cover"/>
    <h2>{album && album.artists[0].name} - {album && album.release_date.substring(0, 4)} - {album && album.total_tracks} songs</h2>
    </div>

    { tracks?.map(track => (
        // eslint-disable-next-line
    <table className="track">
        <tbody>
                <tr>
                    <td><Link to={`/player/${track.id}`}><AiFillPlayCircle size={36}/></Link></td>
                    <td>
                        <p>{track.name}</p>
                        <p>{track.artists[0].name}</p>
                        </td>
                    <td>2:35</td>
                </tr>
                </tbody>
</table>
    ))}
        <Drawer/>
    </div>
    );
}
 
export default Album;