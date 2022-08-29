const express = require('express');
const router = express.Router();
require('dotenv').config();
const randomstring = require('randomstring');
const SpotifyToken = require('../models/spotifyToken')
const qs = require('qs');
const axios = require('axios');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirectUri = "http://localhost:3000/callback";
const scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private']
const now = new Date().getTime();



const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const scope = ['user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read'];

const updateToken = async (data) => {
  return await SpotifyToken.findOneAndUpdate({}, data)
}

const getToken = (code, grant_type, token) => {
  const data = {
    grant_type: grant_type,
    code: code,
    redirect_uri: redirectUri,
    refresh_token: token,
  };
  return axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(({ data }) => {
    data.expires_in = now + data.expires_in * 1000;
    token.update(data)
    return token.save()
  }).catch(err => {
    console.log(err)
  });
}

//token check
const checkToken = async (req, res, next) => {
  res.token = await SpotifyToken.findOne({ where: {} })
  if (res.token) {
    if (res.token.expires_in > now) {
      next();
    } else if (res.token.expires_in < now) {
      res.token = await getToken(res.token.refresh_token, 'refresh_token', res.token)
        .then(() => {
          next();
        });
      } if (!res.token) {
        res.json({ error: 'No token found' })
      }
      return next();
  }}

/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('http://localhost:3000/');
})

// API Login

router.get('/login', (req,res) => {
  
  const state = generateRandomString(16);
  const queryParams = qs.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope.join('%20'),
        redirect_uri: redirectUri,
        state: state,
        show_dialog: true
      });
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
    });

// API Callback

router.get('/callback', checkToken, async (req, res) => {
  let token = await SpotifyToken.findOne({ where: {} });
  const code = req.body.code;
  console.log(code);

   axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
    })
    .then(response => {
      const data = response.data;
      if (response.status === 200) {
        axios.get('https://api.spotify.com/v1/me', {
          headers: {
              Authorization: `${data.token_type} ${data.access_token}`
          }
      })
      .then(response => {
          res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`)
      })
      .catch(err => {
          res.send(err)
      })   
      if(token === null) {
        const createToken = new SpotifyToken ({
            access_token: data.access_token,
            token_type: data.token_type,
            scope: data.scope,
            expires_in: now + data.expires_in,
            refresh_token: data.refresh_token
        })
        token = createToken;
        token.save();
    } else {
        const updatedToken = {
            access_token: data.access_token,
            token_type: data.token_type,
            scope: data.scope,
            expires_in: now + data.expires_in,
            refresh_token: data.refresh_token
        };
        updateToken(updatedToken);
    }
    try {
      token.save();
      res.status(201).json(token);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }})
  .catch((error) => {
    console.error(error);
    res.sendStatus(400);
  });
});
module.exports = router;