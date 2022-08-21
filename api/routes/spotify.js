const express = require('express');
const router = express.Router();
require('dotenv').config();
const randomstring = require('randomstring');
const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyToken = require('../models/spotifytoken')
const qs = require('qs');



router.get('/token', (req,res)=>{

})

// API Login
router.get("/login", (req,res, next) =>{
    const state = randomstring.generate(16)
    const scope = 'user-read-private user-read-email'

    res.redirect('https://accounts.spotify.com/authorize?' +
    qs.stringify({
      client_id: process.env.CLIENT_ID,
      redirect_uri: "http://localhost:3000",
      scope: scope,
      response_type: 'code',
      state: state,
    }));
    })
    
//API Authenticate
router.post('/auth', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    })
    spotifyApi
        .authorizationCodeGrant(code)
        .then((data) => {

            const token = new SpotifyToken({
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
  });   

router.get('/token', (req,res)=>{
    res.send(req.query.authorization_code)
})

module.exports = router;