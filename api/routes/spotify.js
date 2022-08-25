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
const redirectUri = "http://localhost:3001/spotify/v1/callback";
const scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private']


const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirectUri,
});

spotifyApi.setAccessToken(process.env.ACCESS_TOKEN);
console.log(spotifyApi.getAccessToken());

const authorizeURL = spotifyApi.createAuthorizeURL(scopes);

const updateToken = async (data) => {
  return await SpotifyToken.findOneAndReplace({refresh_token: data.refresh_token});
};
console.log(authorizeURL)

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
  const html = spotifyApi.createAuthorizeURL(scopes)
  res.send(html+"&show_dialog=true")  
})

router.get('/callback', async (req,res) => {
  const { code } = req.query;
  console.log(code)
  try {
    const data = spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);
    

    res.redirect("https://api.spotify.com/v1/");
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

});

module.exports = router;