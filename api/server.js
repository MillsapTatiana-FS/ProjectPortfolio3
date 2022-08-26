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


const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/spotify';

mongoose.connect(DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', error => console.log(error))
db.once('open', ()=> console.log("Database Connected"))

const spotifyRouter = require('./routes/spotify')
app.use('/spotify/v1', spotifyRouter)


//look in the react build folder for static build
app.use(express.static(path.join(__dirname, '../reactjs/build')));

//for any routes not defined by the api, assume it's a direct request to a client-side route 

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../reactjs/build', 'index.html'));
})

app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})