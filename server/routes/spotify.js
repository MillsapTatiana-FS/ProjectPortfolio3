const express = require('express');
const router = express.Router();
require('dotenv').config();
const randomstring = require('randomstring');
const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyToken = require('../models/spotifytoken')
const qs = require('qs');
const axios = require('axios');
const request = require('request');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirectUri = "http://localhost:3000/callback";
const scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private']

console.log(client_id)

const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirectUri,
});

spotifyApi.setAccessToken(process.env.ACCESS_TOKEN);
// console.log(spotifyApi.getAccessToken());


const updateToken = async (data) => {
  return await SpotifyToken.findOneAndReplace({refresh_token: data.refresh_token});
};

// const code = SpotifyToken.findOne({refresh_token: String}); 
// spotifyApi.authorizationCodeGrant(code).then(
//   (data) => {
//     spotifyApi.setAccessToken(data.body['access_token']);
//     spotifyApi.setRefreshToken(data.body['refresh_token']);
//   },
//   (error) => {console.log(error)}
// );

/* GET home page. */

router.get('/login', (req,res) => {
  const state = randomstring.generate(16);
  
    res.redirect('https://accounts.spotify.com/authorize?' +
      qs.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });
})

router.get('/callback', async (req,res) => {
  const { code } = req.query;
  // console.log(code)
  try {
    const data = spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);
    

    res.redirect("https://api.spotify.com/v1/me");
  } catch(err) {
    res.redirect('/#/error/invalid token');
  }
});


router.get('/userinfo', async (req,res) => {
  try {
    const result = await spotifyApi.getMe();
    console.log(result.body);
    res.status(200).send(result.body)
  } catch (err) {
    res.status(400).send(err)
  }
});

router.get('me/playlists', async (req,res) => {
  try {
    const result = await spotifyApi.getUserPlaylists();
    console.log(result.body);
    res.status(200).send(result.body);
  } catch (err) {
    res.status(400).send(err)
  }
//get playlist tracks
});

module.exports = router;