/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link, useParams } from '@reach/router'
import { AiFillPlayCircle } from 'react-icons/ai'

    const Albums = () => {

            

        const { token } = useContext(TokenContext)    
        const [tracks, setTracks] = useState();

        useEffect(() => {
            if(token) {
            axios.get(`https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF/tracks?offset=0&limit=10`, {
                headers: {
                    "Authorization": token
                }
            })
        .then(response => setTracks(response.data.items))
    }
    }, [token])

    tracks && console.log(tracks)

    const style = css `
    .PlaylistSlider__container {
        max-width: 325px;
    }
.PlaylistSlider_Slides {
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
 img {
max-width: 155px;
}
ul {
    display: flex;
}
li {
}
    `

    return (
<div css={style} >
        <h1>Category</h1>
        <div className="PlaylistSlider__container">
<div className="PlaylistSlider_Slides">
<ul>
    { tracks?.map(track => (
        <Link to={`/albums/`}>
            <li>
                <img src={track.track.album.images[0].url} alt="test" />
                <p>{track.track.album.name.substring(0, 15)}</p>
                <p></p>
                </li>
                </Link>
    ))}</ul>
</div>
</div>
        </div>
    );
}
 
export default Albums;