const express = require("express");
const router = express.Router();
require("dotenv").config();
//const axios = require("axios");
const querystring = require("querystring");
//const URLSearchParams = require("url").URLSearchParams;
const SpotifyWebApi = require("spotify-web-api-node");
const SpotifyTokn = require("../models/spotifytokn");


router.get('/token', (req, res) => {
    res.send(req.query.authorization_code)
})

router.get('/login', (req, res) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private'

    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: 'http://localhost:3000/callback',
      state: state
    })
)});

router.post('/auth', function (req, res) {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri:'http://localhost:3000/callback',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data=>{

            const token = new SpotifyTokn({
            access_token:data.body.access_token,
            refresh_token:data.body.refresh_token,
            expires_in: data.body.expires_in
            })
            try{
                const newToken = token.save();
                res.status(201).json(newToken)
            } catch(error) {
                res.status(400).json({ message: error.message })
            }
        })
        .catch(err =>{
            console.log(err)
            res.sendStatus(400)
        })
    })   

module.exports = router;