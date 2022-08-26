const express = require('express');
require('dotenv').config();
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const cors= require('cors');
const app = express();

app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));


const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/';

mongoose.connect(DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', error => console.log(error))
db.once('open', ()=> console.log("Database Connection Established"))

const spotifyRouter = require('./routes/spotify')
app.use('/spotify/v1', spotifyRouter)

app.get("/", (req, res) => {
  res.json({ message : "Welcome to the Spotify API"})
})

app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})