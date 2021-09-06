import QueryString from "qs";

const Login = () => {
    
    const options = QueryString.stringify({
        response_type: "code",
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: "user-read-email user-read-private user-library-read playlist-read-private playlist-read-collaborative streaming user-read-playback-state user-modify-playback-state",
        redirect_uri: "http://localhost:8888/callback", 
        state: "112345678iknbcxsertyuilkmnbvcdfghjk"
    })
    console.log(options);
    return ( 
        <>
        <h1>Log in</h1>
        <a href={`https://accounts.spotify.com/authorize?${options}`}>Login in with Spotify</a>
        </>
     );
}
 
export default Login;