/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { useParams } from '@reach/router'
import { IoPlaySkipBackSharp, IoPlayBackSharp, IoPlayCircleSharp, IoPlayForwardSharp, IoPlaySkipForwardSharp  } from 'react-icons/all'
import Spinner from './Spinner';

    const Player = () => {

        const { token } = useContext(TokenContext)    
        const [track, setTrack] = useState();
        const [loading, setLoading] = useState(true);

        const { id } = useParams()
    
        useEffect(() => {
            if(token) {
            axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                headers: {
                    "Authorization": token
                }
            })
        .then(response => setTrack(response.data))
        setLoading(false)
    }
    }, [token])

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
    `

    return loading ? <Spinner/> : (
    <div css={style}>
        <div className="player__top">
            {track && track.name}
        <img class="picture vinyl-1" id="picture" src="http://assets.stickpng.com/images/5856b3da4f6ae202fedf2794.png"/>
        </div>

        <div className="player_bottom">

            <div className="player_bottom__player">
            <svg width="0" height="0">
  <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
    <stop stopColor="#EE0979" offset="0%" />
    <stop stopColor="orange" offset="100%" />
  </linearGradient>
</svg>
            <ul>
                <li><IoPlaySkipBackSharp style={{ fill: "url(#gradient)" }}/></li>
                <li><IoPlayBackSharp/></li>
                <li><IoPlayCircleSharp style={{ fill: "url(#gradient)" }}/></li>
                <li><IoPlayForwardSharp/></li>
                <li><IoPlaySkipForwardSharp style={{ fill: "url(#gradient)" }}/></li>
                <li></li>
            </ul>
            </div>
        </div>
    </div>
    );
}
    
 
export default Player;