/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link, useParams } from '@reach/router'
import { AiFillPlayCircle } from 'react-icons/ai'
import Drawer from './Drawer';
import LazyLoad from 'react-lazyload';
import Spinner from './Spinner'

    const Albums = () => {

            

        const { token } = useContext(TokenContext)    
        const [albums, setAlbums] = useState();
        const [newReleases, setNewReleases] = useState();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            if(token) {
            axios.get(`https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF/tracks?offset=0&limit=10`, {
                headers: {
                    "Authorization": token
                }
            })
        .then(response => setAlbums(response.data.items))
        setLoading(false)
    }
    }, [token])

    useEffect(() => {
        if(token) {
        axios.get(`https://api.spotify.com/v1/browse/new-releases`, {
            headers: {
                "Authorization": token
            }
        })
    .then(response => setNewReleases(response.data.albums.items))
    setLoading(false)
}
}, [token])

    const style = css `
    .newReleases {
        max-width: 325px;
        & table td {
            padding: 4px!important;
        }
        & td p {
            width: 175px;
        }
        & img {
            border-radius: 4px;
        }
    }
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
    margin-right: 15px;
}
& img {
max-width: 155px;
border-radius: 8px;
-webkit-box-shadow: 10px 10px 11px 0px rgba(0,0,0,0.15); 
box-shadow: 10px 10px 11px 0px rgba(0,0,0,0.15);
}
}
.album_small_header {
    font-weight: bold;
    margin-bottom: 1em;
    &:nth-of-type(2) {
        margin-top: 1em;
    }
}
    `

return loading ? <Spinner /> : ( 
<div css={style} >
        <h1>All Albums</h1>
        <p className="album_small_header">Featured Albums</p>
        <div className="PlaylistSlider__container">
<div className="PlaylistSlider_slides">
<ul>
    { albums?.map(album =>  (
        <Link to={`/albums/`}>
            <li>
            <LazyLoad throttle={100} height={155}>
                <img src={album.track.album.images[0].url} alt="test" />
                </LazyLoad>
                <p>{album.track.album.name.substring(0, 15)}</p>
                </li>
                </Link>
    ))}</ul>
</div>
</div>
<p className="album_small_header">New Releases</p>
<div className="newReleases">
<table className="track">
        <tbody>
        
        {newReleases?.map(release => loading ? <Spinner /> : (
                <tr>
                    <td><LazyLoad throttle={200} height={64}><img src={release.images[2].url}/></LazyLoad></td>
                    <td>
                        <p style={{fontWeight:"bold"}}>{release.name}</p>
                        <p>{release.artists[0].name}</p>
                        </td>
                        <td style={{fontSize:"12px"}}>{release.total_tracks} tracks</td>
                </tr>
                ))}
                </tbody>
</table>
</div>
<Drawer/>
        </div>
    );
}
 
export default Albums;