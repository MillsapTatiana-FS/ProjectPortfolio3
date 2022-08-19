const express = require('express');
require('dotenv').config();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors())
app.use(bodyParser.json())

const PORT = 3001;
const loginRouter = require('./routes/spotify');

const db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/spotify', { useNewURLParser: true });
db.on('error', error => console.error(error))
db.once('open', () => console.log('Database connected'))

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept, Authorization");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "POST,PUT,GET,PATCH,DELETE");
    };
    next();
})

app.use(express.json())
app.use('/', loginRouter);



app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})