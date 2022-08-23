const express = require('express');
const router = express.Router();
require('dotenv').config();
const randomstring = require('randomstring');
//const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyToken = require('../models/spotifytoken')
const qs = require('qs');
const axios = require('axios');
const request = require('request');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

// API Login
router.get('/login', (req,res) => {
  const state = generateRandomString(16);
  
  const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read';

  const queryParams = qs.stringify({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

    // const state = randomstring.generate(16)
    // const scope = ["user-read-private","user-library-read", "playlist-read-private","user-read-email", "user-read-currently-playing","streaming","user-modify-playback-state", "user-top-read"];
    
    // const queryParams = qs.stringify({
    //   client_id: client_id,
    //   redirect_uri: redirectUri,
    //   scope: scope.join("%20"),
    //   response_type: 'code',
    //   state: state,
    //   show_dialog: true
    // });
    
    // res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`); 
  
    // API Callback
    router.get('/callback', async function(req, res) {
        const code = req.query.code;
        const state = req.query.state;
        
        axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: qs.stringify({
              code: code,
              redirect_uri: REDIRECT_URI,
              grant_type: 'authorization_code'
            }),
            headers: {
              Authorization: 'Basic ' + (new Buffer.from(CLIENT_ID+ ':' + CLIENT_SECRET).toString('base64')),
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          })
          .then(response => {
            if (response.status === 200) {
        
              const { access_token, token_type } = response.data;
        
              axios.get('http://api.spotify.com/v1/me', {
                headers: {
                  Authorization: `${token_type} ${access_token}`
                }
              })
                .then(response => {
                  res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
                })
                .catch(error => {
                  res.send(error);
                });
            } else {
              res.send(response);
            }
          })
          .catch(error => {
            res.send(error);
          });
      });
        
      // API Refresh Token

      router.get('/refresh_token', async function (req, res) {
        const refresh_token  = req.query.refresh_token;
      
        axios({
          method: 'post',
          url: 'https://accounts.spotify.com/api/token',
          data: qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
          }),
          headers: {
            Authorization: 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
          .then(response => {
            if (response.status === 200) {
              const {refresh_token} = response.data;

              axios.get(`http://localhost:3001/spotify/v1/refresh_token?refresh_token=${refresh_token}`)
                .then(response => {
                  res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
                })
                .catch(error => {
                  res.send(error);
                });
          }});
      });
  
      

module.exports = router;