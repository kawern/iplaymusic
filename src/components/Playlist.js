import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link, useParams } from '@reach/router'
import { AiFillPlayCircle } from 'react-icons/ai'
import './Tracks.scss'
import Drawer from './Drawer'
import Spinner from './Spinner';
import LazyLoad from 'react-lazyload';
import "animate.css"

    const Playlist = () => {

        const { token } = useContext(TokenContext)    
        const [playlist, setPlaylist] = useState();
        const [tracks, setTracks] = useState();
        const [loading, setLoading] = useState(true);

        const { id } = useParams()
    
        useEffect(() => {
            if(token) {
            axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
                headers: {
                    "Authorization": token
                }
            })
        .then(response => setPlaylist(response.data))
        setLoading(false)
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
    setLoading(false)
}
}, [token])


    function correctDuration(ms) {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + ((seconds < 10) ? '0' : '') + seconds;
    }
    return loading ? <Spinner/> : (
    <div className="animate__animated animate__fadeIn">
        <div className="albumTop animate__animated animate__fadeIn">
        <LazyLoad throttle={0} height={325}>
<img src={playlist && playlist.images[0].url} alt={playlist && playlist.name}/>
</LazyLoad>
    </div>

        { tracks?.map(track => (
        // eslint-disable-next-line
    <table className="track animate__animated animate__fadeIn">
        <tbody>
                <tr>
                    <td><Link to={`/player/${track.track.id}`}><AiFillPlayCircle size={36} style={{ fill: "url(#gradient)" }}/></Link></td>
                    <td>
                        <p>{track.track.name}</p>
                        <p>{track.track.artists[0].name}</p>
                        </td>
                    <td>{correctDuration(track.track.duration_ms)}</td>
                </tr>
                </tbody>
</table>
    ))}
        <Drawer/>
    </div>
    );
}
 
export default Playlist;