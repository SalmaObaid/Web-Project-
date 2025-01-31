const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeaderBoardSchema = new Schema({
    username: String,
    score: Number,
    date: {
        type: Date,
        default: Date.now, // Automatically set the date when a new entry is created
    },
});


module.exports = mongoose.model('LeaderBoard', LeaderBoardSchema, 'LeaderBoard');

