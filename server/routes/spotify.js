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