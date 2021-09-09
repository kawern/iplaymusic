import axios from "axios";
import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { navigate } from "@reach/router"


const Callback = (props) => {

    const { setAuthToken } = useContext(AuthContext)

    let code = new URLSearchParams(props.location.search).get("code");
    let state = new URLSearchParams(props.location.search).get("state");

    useEffect(() => {
        axios.post("/.netlify/functions/token",
        JSON.stringify({
            code,
            state
        }))
        .then(response => {
            setAuthToken(response.data)
    }).then(navigate("/featured/"))
    }, [setAuthToken, code, state]);
    return null;
}

 
export default Callback;