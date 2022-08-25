const express = require('express');
require('dotenv').config();
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const path= require('path');
const cors= require('cors');

const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

const client_id = process.env.CLIENT_ID;
const redirectUri = "http://localhost:3001/spotify/v1/callback";

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/spotify';

mongoose.connect(DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', error => console.log(error))
db.once('open', ()=> console.log("Database Connection Established"))

const spotifyRouter = require('./routes/spotify')
app.use('/spotify/v1', spotifyRouter)

//Get external API data
app.get('/login', async (req,res) =>{
    const state = randomstring.generate(16)
    const scope = 'user-read-private'

    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirectUri,
      state: state 
    }));

    
});
app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})