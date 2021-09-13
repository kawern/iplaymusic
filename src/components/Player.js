/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { useParams } from '@reach/router'
import { IoPlaySkipBackSharp, IoPlayBackSharp, IoPauseCircleSharp, IoPlayCircleSharp, IoPlayForwardSharp, IoPlaySkipForwardSharp  } from 'react-icons/all'
import Spinner from './Spinner';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';
import TopBar from './TopBar';
import Drawer from './Drawer';
import recordPlayer from './images/player.png'

import soundWave from './images/sound-wave.png'

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
     // eslint-disable-next-line
    }, [token])

    const style = css`
    .player_topBar {
margin: 0 30px;
}
.player_Drawer {
display: none;
}
    .player__top {
        display: flex;
        justify-content: center;
    margin: 3em 0;
    background: url(${soundWave});
width: 100vw;
    &     svg {
  width: 325px;
  height: 325px;
}

#record {
  transform-origin: center center;
  animation: spin 4s linear infinite;
  animation-play-state: running;
  
}
@keyFrames spin {
  100%{transform: rotate(360deg);}
}
    }
    .player__bottom {
        text-align: center;
        margin-top: 50px;
    }
    .rhap_container {
        width: 100vw;
        position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: none;
    }
    .rhap_progress-bar {
        background: #FF1168;
        height: 2px;
        margin: 0 25px;
    }
    .rhap_progress-indicator {
        background: #FF1168;
    }
    .rhap_main-controls {
        height: 4em;
        margin-top: 2em;
    }
    .rhap_controls-section {
        height: 6em;
        margin-top: 2px;
    }
    .rhap_main-controls-button {
        font-size: 20px;
    }
    .rhap_play-pause-button {
        font-size: 70px;
        width: 70px;
        height: 70px;
        margin-bottom: 27px;
    }
    .rhap_main-controls-button {
        color: black;
    }


    `

    return loading ? <Spinner/> : (
    <div css={style}>
        <div className="player_topBar">
        <TopBar/>
            </div>
        <div className="player__top">
         
  <div className="record">
<img src={recordPlayer} alt="record player"/>
  </div>

        </div>

        <div className="player__bottom">
        <h3>{track && track.name}</h3>
        <p>{track && track.artists[0].name}</p>

            <div className="player__bottom_player">

            <svg width="0" height="0">
  <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
    <stop stopColor="#EE0979" offset="0%" />
    <stop stopColor="orange" offset="100%" />
  </linearGradient>
</svg>

            <AudioPlayer src={track && track.preview_url}
            token={token}
            showSkipControls={true}
            customVolumeControls={[]}
            customAdditionalControls={[]}
            customIcons={{
                previous: <IoPlaySkipBackSharp style={{ fill: "url(#gradient)" }}/>,
                rewind: <IoPlayBackSharp/>,
                play: <IoPlayCircleSharp style={{ fill: "url(#gradient)" }}/>,
                pause: <IoPauseCircleSharp style={{ fill: "url(#gradient)" }}/>,
                forward: <IoPlayForwardSharp/>,
                next: <IoPlaySkipForwardSharp style={{ fill: "url(#gradient)" }}/>
              }} />
            </div>
        </div>
<div className="player_Drawer">
<Drawer/>
    </div>
    </div>
    );
}
    
 
export default Player;
