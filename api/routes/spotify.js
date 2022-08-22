const express = require('express');
const router = express.Router();
require('dotenv').config();
const randomstring = require('randomstring');
//const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyToken = require('../models/spotifytoken')
const qs = require('qs');
const axios = require('axios');
const request = require('request');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirectUri = "http://localhost:3001/spotify/v1/callback";



// API Login
router.get("/login", (req,res) =>{
    const state = randomstring.generate(16)
    const scopes = ["user-read-private","user-library-read", "playlist-read-private","user-read-email", "user-read-currently-playing","streaming","user-modify-playback-state", "user-top-read"];

    res.redirect('https://accounts.spotify.com/authorize?' +
    qs.stringify({
      client_id: client_id,
      redirect_uri: redirectUri,
      scope: scopes.join("20%"),
      response_type: 'code',
      state: state,
      show_dialog: true
    }));
    })
    
    // API Callback
    router.get('/callback', async function(req, res) {

        const code = req.query.code;
        const state = req.query.state;
        
      
        if (false){
          res.redirect('/#' +
            qs.stringify({
              error: 'state_mismatch'
            }));
        } else {
          const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
              code: code,
              redirect_uri: redirectUri,
              grant_type: 'authorization_code'
            },
            headers: {
              'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true
          };
          request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
              const access_token = body.access_token;
              const refresh_token = body.refresh_token;
              const expires_in = body.expires_in;
              const token_type = body.token_type;
              const scope = body.scope;
              res.send({
                'access_token': access_token,
                'refresh_token': refresh_token,
                'expires_in': expires_in,
                'token_type': token_type,
                'scope': scope
              });
            }
          })
        }
      });
 

  router.get('/refresh_token', function(req, res) {

    const refresh_token = req.query.refresh_token;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });

module.exports = router;