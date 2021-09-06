/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link, useParams } from '@reach/router'
import { AiFillPlayCircle } from 'react-icons/ai'
import Drawer from './Drawer';
import LazyLoad from 'react-lazyload';

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
padding: 0;
}
&
ul {
    display: flex;
}
& li {
    margin-right: 10px;
}
& img {
max-width: 155px;
border-radius: 8px;
}
}
    `

    return (
<div css={style} >
        <h1>Category</h1>
        <div className="PlaylistSlider__container">
<div className="PlaylistSlider_slides">
<ul>
    { tracks?.map(track => (
        <Link to={`/albums/`}>
            <li>
            <LazyLoad throttle={100} height={155}>
                <img src={track.track.album.images[0].url} alt="test" />
                </LazyLoad>
                <p>{track.track.album.name.substring(0, 15)}</p>
                <p></p>
                </li>
                </Link>
    ))}</ul>
</div>
</div>
<Drawer/>
        </div>
    );
}
 
export default Albums;