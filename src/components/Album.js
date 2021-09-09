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
    },
        // eslint-disable-next-line
    [token])

    useEffect(() => {
        if(token) {
        axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
            headers: {
                "Authorization": token
            }
        })
    .then(response => setTracks(response.data.items))
}
},
    // eslint-disable-next-line
[token])
    
    const style = css `
    .centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
    .track {
  border-collapse: collapse;
  width: 100%;
  width: 325px;
}

.track td {
  padding: 8px;
  padding-left: 0;
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
.albumTop {
    text-align: center;
    margin-bottom: 0.5em;
}
.albumMiddle {
    width: 325px;
    margin: 0 auto;
    & p {
        font-weight: bold;
    }
}
    `
    return (
    <div css={style} >
        <div className="albumTop">
<img src={album && album.images[0].url} alt={album && album.name}/>
    <h3>{album && album.artists[0].name}</h3>
    <h3>{album && album.name}</h3>
    </div>
<div className="albumMiddle">
<p>All songs</p></div>
<table className="track"><tbody>
    { tracks?.map(track => (
        
                <tr>
                    <td><Link to={`/test/${track.id}`}><AiFillPlayCircle size={36} style={{ fill: "url(#gradient)" }}/></Link></td>
                    <td>
                        <p>{track.name}</p>
                        <p>{track.artists[0].name}</p>
                        </td>
                    <td>2:35</td>
                </tr>
               
    ))}
     </tbody></table>
        <Drawer/>
    </div>
    );
}
 
export default Album;