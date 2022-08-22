const express = require('express');
const router = express.Router();
require('dotenv').config();
const randomstring = require('randomstring');
const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyToken = require('../models/spotifytoken')
const qs = require('qs');

const client_id = process.env.CLIENT_ID;
const redirectUri = "http://localhost:3000/callback";

const app = express();


// API Login
app.get("/login", (req,res, next) =>{
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
    app.get('/callback', function(req, res) {

        const code = req.query.code || null;
        const state = req.query.state || null;
      
        if (state === null) {
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
              'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
          };
        }
      });

    //API Authenticate
app.post('/auth', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000/callback",
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
                const newToken = token.update();
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

  app.get('/refresh_token', function(req, res) {

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