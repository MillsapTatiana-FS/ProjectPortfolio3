const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.post('/login', (req, res) => {
  const { code } = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: 'd6f9ca3d9254465c9820c56c43246f1e',
    clientSecret: 'a96119c60e8640ffb3d7a66d2e748a77'
  })

  spotifyApi.authorizationCodeGrant(code).then(data => {res.json({
    access_token: data.body['access_token'],
    refresh_token: data.body['refresh_token'],
    expires_in: data.body['expires_in']
    })
  }).catch(()=> {
    res.sendStatus(400)
  })
})
// var http = require("http");   

// http.createServer(function (req, res) {
//   res.writeHead(200, {"Content-Type": "text/plain"});
//   res.write("Hello World");
//   res.end();
// }).listen(8888);