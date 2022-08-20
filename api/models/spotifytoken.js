const mongoose = require('mongoose');

const spotifyTokenSchema = new mongoose.Schema({
    _auth: mongoose.Schema.Types.ObjectId,
    access_token: {
        type: String
    },
    token_type: {
        type: String
    },
    scope: {
        type: String
    },
    expires_in: {
        type: Number
    },
    refresh_token: {
        type: String
    }

})

module.exports = mongoose.model('SpotifyToken', spotifyTokenSchema);
