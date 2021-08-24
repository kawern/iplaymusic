import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'

    const Featured = () => {
        
    const { token } = useContext(TokenContext)    
    const [playlists, setPlaylists] = useState();

useEffect(() => {
    if(token) {
    axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
        headers: {
            "Authorization": token
        }
    })
    .then(response => setPlaylists(response.data.playlists.items))
}
}, [token])
    return (
    <>
    <h1>Featured</h1>

    { playlists?.map(playlist => (
        <ul>
        <li><img key={playlist.id} src={playlist.images[0].url} alt={playlist.images} /></li>
        </ul>
    ))}
    </>
    );
}
 
export default Featured;