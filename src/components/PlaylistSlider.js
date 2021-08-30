/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link } from '@reach/router'

    const PlaylistSlider = () => {

    const style = css `
    .PlaylistSlider__container {
        max-width: 325px;
    }
.PlaylistSlider_Slides {
  overflow: auto;
  white-space: nowrap;
}

.PlaylistSlider_Slides a {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}
    li {
        & img {
        width: 155px;
        border-radius: 8px;
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
<div className="PlaylistSlider__container">
<div className="PlaylistSlider_Slides">
<ul>
    { playlists?.map(playlist => (
        <Link to={`/playlist/${playlist.id}`}>
            <li>
                <img src={playlist.images[0].url} alt={playlist.images} />
                </li>
                </Link>
        
    ))}</ul>
</div>
</div>
    </div>
    );
}
 
export default PlaylistSlider;