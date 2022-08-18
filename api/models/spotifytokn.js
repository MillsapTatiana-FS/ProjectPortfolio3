const mongoose = require("mongoose");

const spotifytoknSchema = new mongoose.Schema({
    access_token: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
        required: true,
    },
    expires_in: {
        type: Number,
        required: true,
    },

})

module.exports = mongoose.model('SpotifyTokn', spotifytoknSchema)
