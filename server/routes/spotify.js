const express = require('express');
const router = express.Router();
require('dotenv').config();
const randomstring = require('randomstring');
const SpotifyToken = require('../models/spotifytoken')
const qs = require('qs');
const axios = require('axios');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirectUri = "http://localhost:3000/callback";
const scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private']


const updateToken = async (data) => {
  return await SpotifyToken.findOneAndReplace({refresh_token: data.refresh_token});
};
const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const scope = ['user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read'];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('http://localhost:3000/');
})

router.get('/login',function (req,res,next) {
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

router.get('/callback', async (req,res) => {

  await axios({
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
        if (response.status === 200) {
          const newToken = new SpotifyToken ({
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            expires_in: response.data.expires_in,
            created_at: response.data.created_at
            });
          newToken.save({});
            
          const queryParams = qs.stringify({
            access_token,
            refresh_token,
            expires_in,
          });
            //redirect to react
            res.redirect('http://localhost:3001/spotify/home');
            //pass along tokens in query params        
          } else {
            res.redirect(`/?qs.stringify({ error: 'query params' })`);
          }
        })
        .catch(error => {
          res.send(error);
        });
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



// // API Login
// router.get('/login', (req,res) => {
//   const state = generateRandomString(16);
    
//   const queryParams = qs.stringify({
//     client_id: CLIENT_ID,
//     response_type: 'code',
//     redirect_uri: REDIRECT_URI,
//     state: state,
//     scope: scope,
//     show_dialog: true,
//   });
//   res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
// });

//     // API Callback
// router.get('/callback', async (req, res) => {
// //
//   await axios({
//     method: 'post',
//     url: 'https://accounts.spotify.com/api/token',
//     data: qs.stringify({
//       grant_type: 'authorization_code',
//       code: code,
//       redirect_uri: REDIRECT_URI,
//     }),
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
//       },
//     })
//     .then(response => {
//       if (response.status === 200) {
//         const newToken = new SpotifyToken ({
//           access_token: response.data.access_token,
//           refresh_token: response.data.refresh_token,
//           expires_in: response.data.expires_in,
//         });
//         newToken.save({});
        
//         const queryParams = qs.stringify({
//           access_token,
//           refresh_token,
//           expires_in,
//         });
//         //redirect to react
//         res.redirect('http://localhost:3001/spotify/v1?${queryParams}');
//         //pass along tokens in query params        
//       } else {
//         res.redirect(`/?qs.stringify({ error: 'query params' })`);
//       }
//     })
//     .catch(error => {
//       res.send(error);
//     });
// })
// // API Refresh Token
// router.get('/refresh_token', (req, res) => {
//   const { refresh_token } = req.query;

//   axios({
//     method: 'post',
//     url: 'https://accounts.spotify.com/api/token',
//     data: qs.stringify({
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token,
//     }),
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
//     },
//   })
//   .then((data) => {
//     if (!token ) {
//       const newToken = new SpotifyToken({
//         accessToken: data.body.access_token,
//         refreshToken: data.body.refresh_token,
//         expiresIn: data.body.expires_in,
//       });
//       token = newToken;
//     } else if (token.expiresIn < data.body.expires_in) {// if token expires in less than new token expires in, update token with new token
//       token.accessToken = data.body.access_token;
//     }
//     try {
//       token.save();
//       res.status(201).json(token);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   })
  
// });


module.exports = router;