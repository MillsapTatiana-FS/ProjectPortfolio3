const express = require('express');
const router = express.Router();
require('dotenv').config();
const {CLIENT_ID, CLIENT_SECRET} = process.env;
const querystring = require('querystring');
const randomstring = require('randomstring');
const URLSearchParams = require('urlsearchparams');
const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyToken = require('../models/spotifytoken')
const jwt = require('jsonwebtoken');
const checkAuth = require('../jwt/checkAuth');



router.get('/token', (req,res)=>{

})

// API Login
router.get('/login', (req,res) =>{
    const state = randomstring.generate(16)
    const scope = 'user-read-private'

    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: 'http://localhost:3000/callback',
      state: state 
    }));
    })

router.get('/checktoken', (req,res)=>{
    
})

    
    
//API Authenticate
router.post('/auth', function (req, res) {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri:'http://localhost:3000/callback',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data=>{

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