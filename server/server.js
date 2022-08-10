import { crypto } from 'crypto-hash';

const express = require("express") 
const spotifyWebApi = require('spotify-web-api-node');
require("dotenv" ) .config() ;

//const mongoose = require ("mongoose") ;
const cors = require("cors") ;
const app = express (); 

app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/login", (req, res) => {
    const nonce = crypto.randomBytes(16).toString("base64");
    // Set the strict nonce-based CSP response header
    const csp = `script-src 'nonce-${nonce}' 'strict-dynamic' https:; object-src 'none'; base-uri 'none';`;
    response.set("Content-Security-Policy", csp);

    const code  = req.body.code
    const spotifyApi = new spotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    })
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})

app.listen(PORT, () => {
console. log (`Server running on ${PORT}.`) 
})