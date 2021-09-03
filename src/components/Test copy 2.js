import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../contexts/TokenContext'
import axios from "axios";



const Test = () => {
    const { token } = useContext(TokenContext)    
    const [albums, setAlbums] = useState();
    const [newReleases, setNewReleases] = useState();

    useEffect(() => {
        if(token) {
        axios.get(`https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF/tracks?offset=0&limit=10`, {
            headers: {
                "Authorization": token
            }
        })
    .then(response => setAlbums(response.data.items))
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
}

}, [token])
console.log(newReleases)

    const style = css`
.slick-slide {
    max-width: 155px;
    max-height: 155px;
    margin-right: 10px;
}`

    var settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 0.5
      };

    return ( 
        <div className="container" style={{width: "100vw"}} css={style}>
        <Slider {...settings}>
        { newReleases?.map(release => (

            <div><img style={{width: "155px"}}
            src={release.images[0].url} />
            <p>{release.name}</p></div>
            ))}
        </Slider>
      </div>
     );
}
 
export default Test;