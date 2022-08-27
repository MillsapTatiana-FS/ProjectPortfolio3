const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const path= require('path');
const cors= require('cors');



app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

const client_id = process.env.CLIENT_ID;
const redirectUri = "http://localhost:3000/callback";

<<<<<<< HEAD:server/server.js
const PORT = process.env.PORT || 3000;
=======
const PORT = process.env.PORT || 3001;
>>>>>>> 4948e536ce036436471abee0c3c9ce28d72b2684:api/server.js
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/spotify';

mongoose.connect(DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', error => console.log(error))
db.once('open', ()=> console.log("Database Connected"))

const spotifyRouter = require('./routes/spotify')
app.use('/spotify/v1', spotifyRouter)

<<<<<<< HEAD:server/server.js
//Get external API data
=======

//look in the react build folder for static build
app.use(express.static(path.join(__dirname, '../reactjs/build')));

//for any routes not defined by the api, assume it's a direct request to a client-side route 

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../reactjs/build', 'index.html'));
})
>>>>>>> 4948e536ce036436471abee0c3c9ce28d72b2684:api/server.js

app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})