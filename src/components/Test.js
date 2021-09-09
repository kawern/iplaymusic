/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { useParams } from '@reach/router'
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

    console.log(track)

    const style = css`
    .player_top {
        text-align: center;
    }
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
        height: 100px;
        position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    }
    `
    return (
    <div css={style}>
        <div className="player_top">
        <img src={track && track.album.images[0].url} alt="test"/>
        <h3>{track && track.album.name}</h3>
        </div>

        <div className="player_bottom">

            <div className="player_bottom__player">
            <SpotifyWebPlayer
  token="" //{token && token.replace("Bearer ", "")}
  uris={[
    `spotify:track:${id}`
]}
  autoPlay={true}
  styles={{
    activeColor: '#000',
    bgColor: '#fff',
    color: '#000',
    loaderColor: '#EE0979',
    sliderColor: '#1cb954',
    trackArtistColor: '#000',
    trackNameColor: '#000',
  }}
/>
            </div>
        </div>
    </div>
    );
}
    
 
export default Test;