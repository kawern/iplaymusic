/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link } from '@reach/router'

    const Featured = () => {

    const style = css `
    li {
        margin-bottom: 2em;
        
        & img {
        width: 325px;
        border-radius: 8px;
        z-index: 3;
        box-shadow: -5px -5px 10px rgb(255 255 255 / 50%), 5px 5px 10px rgb(170 170 204 / 25%), 10px 10px 20px rgb(170 170 204 / 50%);
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

    { playlists?.map(playlist => (
        <ul>
        <Link to={`/playlist/${playlist.id}`}>
            <li>
                <img src={playlist.images[0].url} alt={playlist.images} />
                </li>
                </Link>
        </ul>
    ))}
    </div>
    );
}
 
export default Featured;