const express = require('express');
require('dotenv').config();
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const path= require('path');
const cors= require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json())

const PORT = process.env.PORT || 3001;
const spotifyRouter = require('./routes/spotify')



mongoose.connect('mongodb://localhost:27017/spotify/', {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', error => console.log(error))
db.once('open', ()=> console.log("Database Connection Established"))

app.use(express.json())
app.use('/spotify', spotifyRouter)

//Get external API data
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../reactjs/build', 'index.html'));
})

app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})