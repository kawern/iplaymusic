/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link, useParams } from '@reach/router'
import { IoPlaySkipBackSharp, IoPlayBackSharp, IoPlayCircleSharp, IoPlayForwardSharp, IoPlaySkipForwardSharp  } from 'react-icons/all'
import SpotifyWebPlayer from 'react-spotify-web-playback';

    const Test = () => {

        const { token } = useContext(TokenContext)    
        const [track, setTrack] = useState();

        const { id } = useParams()
    
        useEffect(() => {
            if(token) {
            axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                headers: {
                    "Authorization": token
                }
            })
        .then(response => setTrack(response.data))
    }
    }, [token])

    track && console.log(track)

    const style = css`
    .player_bottom {
        &__player ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            & li {
                font-size: 1.5em;
                margin: 0 5px;
            }
            & li:nth-child(3) {
                font-size: 3em;
            }
        }
    }
    .PlayerRSWP {
        width: 100vw;
        position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    }
    `

    return (
    <div css={style}>
        <div className="player__top">
        <img src={track && track.album.images[0].url} alt="test"/>
        </div>

        <div className="player_bottom">

            <div className="player_bottom__player">
            <SpotifyWebPlayer
  token="BQD6rdlhr-f7o0lf7Rna2LwCNeEXdPnc7eHdsYyc8tIax0MpBa83t9RLaOEOZ6uFTgLwEcq9cHNI0pvlK1nhzfV1rD7jIVyh_Bmdhf_4X4787tf3TI7NiDp8tehYnjGblLN-o4ckfMz-m4lqiaAu4xuh0C_h2feSYEWZ4aeOOnK7_cysyqGaM03_pN0"
  uris={[
    `spotify:track:${id}`,
    `spotify:track:584UC3Qpm8SbYd7aRWKREu`,
    `spotify:track:584UC3Qpm8SbYd7aRWKREu`,
    `spotify:track:584UC3Qpm8SbYd7aRWKREu`,
    `spotify:track:584UC3Qpm8SbYd7aRWKREu`,
    `spotify:track:584UC3Qpm8SbYd7aRWKREu`
]}
  autoPlay={true}
  styles={{
    activeColor: '#FF1168',
    bgColor: '#333',
    color: '#fff',
    loaderColor: '#fff',
    sliderColor: '#FF1168',
  }}
/>
            </div>
        </div>
    </div>
    );
}
    
 
export default Test;