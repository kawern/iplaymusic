import QueryString from "qs";

const Login = () => {
    
    const options = QueryString.stringify({
        response_type: "code",
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: "streaming user-read-email user-read-private user-read-playback-state user-read-currently-playing user-library-read playlist-read-private playlist-read-collaborative user-modify-playback-state",
        redirect_uri: "https://thirsty-goodall-de0bb8.netlify.app/callback", 
        state: "112345678iknbcxsertyuilkmnbvcdfghjk"
    })
    return ( 
        <>
        <h1>Log in</h1>
        <a href={`https://accounts.spotify.com/authorize?${options}`}>Login in with Spotify</a>
        </>
     );
}
 
export default Login;