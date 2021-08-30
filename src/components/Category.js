/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link, useParams } from '@reach/router'
import { AiFillPlayCircle } from 'react-icons/ai'

    const Category = () => {

        const { token } = useContext(TokenContext)    
        const [category, setCategory] = useState();
        const [playlists, setPlaylists] = useState();

        const { id } = useParams()
    
        useEffect(() => {
            if(token) {
            axios.get(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, {
                headers: {
                    "Authorization": token
                }
            })
        .then(response => setPlaylists(response.data.playlists.items))
    }
    }, [token])

    category && console.log(playlists)
    const style = css `
    .PlaylistSlider__container {
        max-width: 325px;
        display: flex;
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
 img {
max-width: 155px;
}
    `

    return (
    <div css={style} >
        <h1>Category</h1>
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
 
export default Category;