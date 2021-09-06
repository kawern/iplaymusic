/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link } from '@reach/router'
import Drawer from './Drawer'
import LazyLoad from 'react-lazyload';


    const Featured = () => {

    const style = css `
    li {
        margin-bottom: 2em;
        
        & img {
        width: 325px;
        border-radius: 8px;
        z-index: 3;
        -webkit-box-shadow: 10px 10px 11px 0px rgba(0,0,0,0.15); 
box-shadow: 10px 10px 11px 0px rgba(0,0,0,0.15);
    }
}

    `
        
        const { token } = useContext(TokenContext)    
    const [playlists, setPlaylists] = useState();

    useEffect(() => {
        if(token) {
        axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
            headers: {
                "Authorization": token
            }
        })
    .then(response => setPlaylists(response.data.playlists.items))
}
}, [token])

playlists && console.log(playlists);
    return (
    <div css={style}>
    <h1>Featured</h1>
    <ul>
    { playlists?.map(playlist => (
        <Link to={`/playlist/${playlist.id}`}>
            <li>
            <LazyLoad throttle={200} height={300}>
                <img src={playlist.images[0].url} alt={playlist.images} />
                </LazyLoad>
                </li>
                </Link>
        
    ))}</ul>
    <Drawer/>
    </div>
    );
}
 
export default Featured;