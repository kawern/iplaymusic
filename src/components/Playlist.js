/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import { Link, useParams } from '@reach/router'

    const Playlist = () => {

        const { token } = useContext(TokenContext)    
        const [Playlist, setPlaylist] = useState();
        // const [PlaylistTracks, setPlaylistTracks] = useState();

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

    
    const style = css `
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 325px;
    }
    p:nth-child(1) {
        font-weight: bold;
    }
    p:nth-child(3) {
        font-weight: lighter;
    }
    .song_artist {
        margin-right: 9em;
        line-height: 1.7em;
    }

    `
    Playlist && console.log(Playlist)
    return (
<>{Playlist && Playlist.name}


</>
    );
}
 
export default Playlist;