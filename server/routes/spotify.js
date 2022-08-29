// const express = require('express');
// const router = express.Router();
// require('dotenv').config();
// const randomstring = require('randomstring');
// const SpotifyToken = require('../models/spotifyToken')
// const qs = require('qs');
// const axios = require('axios');

// const client_id = process.env.CLIENT_ID;
// const client_secret = process.env.CLIENT_SECRET;
// const redirectUri = "http://localhost:3000/callback";
// const scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private']
// const now = new Date().getTime();



// const generateRandomString = length => {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };


// const updateToken = async (data) => {
//   return await SpotifyToken.findOneAndUpdate({}, data)
// }

// const getToken = (code, grant_type, token) => {
//   const data = {
//     grant_type: grant_type,
//     code: code,
//     redirect_uri: redirectUri,
//     refresh_token: token,
//   };
//   return axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   }).then(({ data }) => {
//     data.expires_in = now + data.expires_in * 1000;
//     token.update(data)
//     return token.save()
//   }).catch(err => {
//     console.log(err)
//   });
// }

// //token check
// const checkToken = async (req, res, next) => {
//   res.token = await SpotifyToken.findOne({ where: {} })
//   if (res.token) {
//     if (res.token.expires_in > now) {
//       next();
//     } else if (res.token.expires_in < now) {
//       res.token = await getToken(res.token.refresh_token, 'refresh_token', res.token)
//         .then(() => {
//           next();
//         });
//       } if (!res.token) {
//         res.json({ error: 'No token found' })
//       }
//       return next();
//   }}

// /* GET home page. */
// router.get('/', (req, res) => {
//   res.redirect('http://localhost:3000/');
// })

// // API Login

// router.get('/login', (req,res) => {
  
//   const state = generateRandomString(16);
//   const queryParams = qs.stringify({
//         response_type: 'code',
//         client_id: client_id,
//         scope: "user-read-private user-read-email",
//         redirect_uri: redirectUri,
//         state: state,
//         show_dialog: true
//       });
//   res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
//     });

// // API Callback

// router.get('/callback', async (req, res) => {
//   let token = await SpotifyToken.findOne({ where: {} });
//   const code = req.body.code;
//   console.log(code);

//    axios({
//     method: 'post',
//     url: 'https://accounts.spotify.com/api/token',
//     data: qs.stringify({
//       grant_type: 'authorization_code',
//       code: code,
//       redirect_uri: redirectUri,
//     }),
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
//       },
//     })
//     .then(response => {
//       const data = response.data;
//       console.log('------- res data ----');
//       console.log(data)
//       // if (response.status === 200) {
        
//       // })
//       // .then(response => {
//       //     res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`)
//       // })
//       // .catch(err => {
//       //     res.send(err)
//       // })   
//       if(token === null) {
//         const createToken = new SpotifyToken ({
//             access_token: data.access_token,
//             token_type: data.token_type,
//             scope: data.scope,
//             expires_in: now + data.expires_in,
//             refresh_token: data.refresh_token
//         })
//         token = createToken;
//         token.save();
//     } else {
//         const updatedToken = {
//             access_token: data.access_token,
//             token_type: data.token_type,
//             scope: data.scope,
//             expires_in: now + data.expires_in,
//             refresh_token: data.refresh_token
//         };
//         updateToken(updatedToken);
//     }
//     try {
//       token.save();
//       res.status(201).json(token);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
  
//   .catch((error) => {
//     console.error(error);
//     res.sendStatus(400);
//   });
// });

// router.get('/me', (req, res) => {

// })
// module.exports = router;
require('dotenv').config();
const express = require('express');
const { CLIENT_ID, CLIENT_SECRET } = process.env
const client_id = CLIENT_ID;
const client_secret = CLIENT_SECRET;
const axios = require('axios')
const randomstring = require('randomstring')
// const { SpotifyToken } = require('../models')
const SpotifyToken = require('../models/spotifyToken')
const qs = require('qs')
const scope = ['user-read-private user-read-email playlist-modify-public playlist-modify-private']

const basicAuth = 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
const redirect_uri = 'http://localhost:3001/spotify/v1/auth'
const now = new Date().getTime()

const requestToken = (code, grant_type, token) => {
  let data = (grant_type === "refresh_token") 
    ? qs.stringify({ refresh_token: code, grant_type })
    : qs.stringify({ code, grant_type, redirect_uri }) 
  return axios({
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token', 
      data,
      headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(({ data }) => {
      console.log(data)
      data.expires_in = new Date().getTime() + data.expires_in
      if(grant_type === "refresh_token") {
        SpotifyToken.updateMany({ refresh_token: code }, {
          access_token: data.access_token,
          token_type: data.token_type,
          expires_in: data.expires_in,
          refresh_token: code
        })
      } else {
        return new SpotifyToken(data).save()
      }
      return SpotifyToken.findOne({ refresh_token: code })
    }).catch((error) => { 
      console.error(error)
      return false 
    })
}

const jwt = async (req, res, next) => {
  req.token = await SpotifyToken.find()
  req.token = (req.token.length > 0) ? req.token[0] : null;
  console.log(req.token)
  if (!req.token && !req.query.code) { 
    return next() 
  }
  if (!req.token && req.query.code) {
    const createToken = new SpotifyToken({})
    req.token = await requestToken(req.query.code, 'authorization_code', createToken)
  } else if (req.token && now > req.token.expires_in) {
    req.token = await requestToken(req.token.refresh_token, 'refresh_token', req.token)
  }
  if (!req.token) {
    res.json({ error: 'JWT could not be requested...' })
  }
  return next()
}

const auth = async (req, res) => {
  console.log(req.token)
  if (req.token) {
    res.redirect('http://localhost:3000')
  } else {
    res.redirect('http://localhost:3000/login')
  }
}

const status = async (req, res) => {
  const valid = (req.token && req.token.expires_in > now) ? true : false
  res.json({ valid })
}

const login = async (req, res) => {

  const state = randomstring.generate(16);
  res.redirect('https://accounts.spotify.com/authorize?' +
    qs.stringify({
      response_type: 'code',
      client_id,
      redirect_uri,
      state,
      scope
  }));
}

const search = async (req, res) => {
  await axios({
    method: 'GET',
    url: 'https://api.spotify.com/v1/search',
    params: {
      type: 'album,artist,track',
      q: req.query.q,
      limit: 3
    },
    headers: { 
      'Authorization': 'Bearer ' + req.token.access_token,
      'Content-Type': 'application/json'
    }
  }).then(({data}) => {
    res.json(data)
  }).catch((error) => {
    res.json(error)
  })
}

const profile = async (req, res) => {
  await axios({
    method: 'GET',
    url: 'https://api.spotify.com/v1/me',
    headers: { 
      'Authorization': 'Bearer ' + req.token.access_token,
      'Content-Type': 'application/json'
    }
  }).then(({data}) => {
    res.json(data)
  }).catch((error) => {
    res.json(error)
  })
}

const spotify = express.Router()
spotify.get('/login', login)
spotify.get('/auth', jwt, auth)
spotify.get('/token', jwt, status)
spotify.get('/status', jwt, status)
spotify.get('/search', jwt, search)
spotify.get('/profile', jwt, profile)

module.exports = spotify