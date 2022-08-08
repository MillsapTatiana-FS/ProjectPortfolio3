const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express()
app.use(cors())
app.use(bodyParser.json())

console.log("Hello")

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: 'd6f9ca3d9254465c9820c56c43246f1e',
    clientSecret: 'a96119c60e8640ffb3d7a66d2e748a77',
    refreshToken,
  })

  spotifyApi
  .refreshAccessToken()
  .then((data) => {
    res.json({
      accessToken: data.body.accessToken,
      expiresIn: data.body.expiresIn,
    })
    
  })
  .catch(() => {
    res.sendStatus(400)
    })
  })


app.post("/login", (req, res) => {
  const code  = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: 'd6f9ca3d9254465c9820c56c43246f1e',
    clientSecret: 'a96119c60e8640ffb3d7a66d2e748a77',
  })

  spotifyApi
  .authorizationCodeGrant(code)
  .then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    })
  })
  .catch(err => {  
    res.sendStatus(400)
  })
})

app.listen(3001)