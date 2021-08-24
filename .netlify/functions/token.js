const { default: axios } = require("axios");


exports.handler = async (event, context) => {

    if (event.httpMethod !== "POST") return { statusCode: 405, body: ""};

    let body = JSON.parse(event.body)

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        params: {
            code: body.code,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            grant_type: "authorization_code"
        },
        headers: {
            Authorization: "Basic " + Buffer.from(process.env.REACT_APP_CLIENT_ID + ":" + process.env.REACT_APP_CLIENT_SECRET).toString("base64")
        },
        json: true,
    };

    try {
        let response = await axios(authOptions);
        return {
            statusCode: 201,
            body: JSON.stringify(response.data)
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: "Internal Server Error"
        }
    }
}