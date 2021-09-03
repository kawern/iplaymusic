/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link, useParams } from '@reach/router'
import { AiFillPlayCircle } from 'react-icons/ai'
import './Tracks.scss'

    const Playlist = () => {

        const { token } = useContext(TokenContext)    
        const [playlist, setPlaylist] = useState();
        const [tracks, setTracks] = useState();

        const { id } = useParams()
    
        useEffect(() => {
            if(token) {
            axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
                headers: {
                    "Authorization": token
                }
            })
        .then(response => setPlaylist(response.data))
    }
    }, [token])

    useEffect(() => {
        if(token) {
        axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            headers: {
                "Authorization": token
            }
        })
    .then(response => setTracks(response.data.items))
}
}, [token])


    playlist && console.log(playlist)

    function correctDuration(ms) {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + ((seconds < 10) ? '0' : '') + seconds;
    }
    return (
    <div>
        <div className="albumTop">
<img src={playlist && playlist.images[0].url} alt="album cover"/>
    </div>

        { tracks?.map(track => (
        // eslint-disable-next-line
    <table className="track">
        <tbody>
                <tr>
                    <td><Link to={`/player/${track.id}`}><AiFillPlayCircle size={36}/></Link></td>
                    <td>
                        <p>{track.track.name}</p>
                        <p>{track.track.artists[0].name}</p>
                        </td>
                    <td>{correctDuration(track.track.duration_ms)}</td>
                </tr>
                </tbody>
</table>
    ))}
    </div>
    );
}
 
export default Playlist;