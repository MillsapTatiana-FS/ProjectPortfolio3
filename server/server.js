const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/spotify';

mongoose.connect(DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', error => console.log(error))
db.once('open', ()=> console.log("Database Connected"))

const spotifyRouter = require('./routes/spotify')
app.use('/spotify/v1', spotifyRouter)



app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})