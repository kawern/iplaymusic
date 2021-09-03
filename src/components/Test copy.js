/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'

    const Test = () => {
        const { token } = useContext(TokenContext)    
        const [tracks, setTracks] = useState();
        const [playlist, setPlaylist] = useState([]);

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
    const handleClick = value => async() => {
        axios.get(`https://api.spotify.com/v1/albums/${value}`, {
          headers: {
              "Authorization": token
          }
      })
      .then(response => console.log(response.data))
      }

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
<div className="Albums" css={style} >
        <h1>Albums</h1>
        <div className="Albums_slider">
            { tracks?.map(track => (
<div className="Albums_slider__item">
                <img
                onClick={handleClick(track.track.album.id)}
                src={track.track.album.images[0].url} alt="test" />
                <p>{track.track.album.name.substring(0, 15)}</p>
                <p>{track.track.artists[0].name}</p>           
</div>
))}
</div>
        </div>
    );
}
 
export default Test;