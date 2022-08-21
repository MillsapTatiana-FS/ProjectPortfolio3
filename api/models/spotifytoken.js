const mongoose = require('mongoose');

const spotifyTokenSchema = new mongoose.Schema({
    access_token: { type: String, required: true },
    expires_in: { type: Number, required: true},
    refresh_token: { type: String, required: true },
},
    );

module.exports = mongoose.model('SpotifyToken', spotifyTokenSchema);
