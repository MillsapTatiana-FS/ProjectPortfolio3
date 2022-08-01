require('dotenv').config();
const express = require('express');
const app = express();

console.log("------Env Variables------")
console.log(process.env)
console.log("------Env Variables------")

app.listen(3001)