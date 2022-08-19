const express = require('express');
const dotenv = require('dotenv');
const app = express();
require('dotenv').config();
const router = express.Router();
const SpotifyToken = require('../models/spotifytoken');
const SpotifyWebApi = require('spotify-web-api-node');

app.post('/auth', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000/callback",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    })
    /
    spotifyApi.authorizationCodeGrant(code).then(data => {
        const spotifyToken = new SpotifyToken({
            access_Token: data.body.access_token,
            refresh_Token: data.body.refresh_token,
            expires_in: data.body.expires_in
        })

        try {
            const newSpotifyToken = spotifyToken.save()
            res.status(201).json(newSpotifyToken);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.get('/login', (req, res) => {
    
})

router.get('/token', (req, res) => {
    res.send(req.query.authorization_code)
})

module.exports = router;