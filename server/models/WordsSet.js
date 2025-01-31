const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WordsSetSchema = new Schema({
    level: { type: String, required: true },  // Example: "beginner"
    words: { type: [String], required: true } // Array of words
});


module.exports = mongoose.model('WordsSet', WordsSetSchema, 'WordsSet');

