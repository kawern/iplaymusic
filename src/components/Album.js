/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link, useParams } from '@reach/router'
import { AiFillPlayCircle } from 'react-icons/ai'

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
.track td:first-child {
  width: 5%;
  text-align: center;
}
.track td p {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
    `

    tracks && console.log(tracks)
    return (
    <div css={style}>
    <h1>{album && album.name}</h1>
    <ul>

    { tracks?.map(track => (
    <table className="track">
        <tbody>
                <tr>
                    <td><AiFillPlayCircle size={36}/></td>
                    <td>
                        <p>{track.name}</p>
                        <p>{track.artists[0].name}</p>
                        </td>
                    <td>2:35</td>
                </tr>
                </tbody>
</table>
    ))}
    </ul>
    </div>
    );
}
 
export default Album;