const WordsSet = require('../models/WordsSet.js');
const Leaderboard = require('../models/LeaderBoard.js');

// get dashboard 
exports.dashboard = async (req, res) => {

    const locals = {
        title: 'Dashboard',
    };

    try {


        const words = await WordsSet.find();

        res.render('dashboard/index', {
            user: req.user,
            words: words,
            userName: req.user.displayName, //Get user Name
            layout: '../Views/layouts/dashboard',
        });

    } catch (error) {
        console.log("Error while directing to dashboard " + error);
    }
};

exports.play_game = async (req, res) => {

    const locals = {
        title: 'Dashboard',
    };

    try {

        const level = req.query.level;
        res.render('dashboard/play-game', {
            user: req.user,
            game_level: level,
            wordleWord: req.session.wordleWord,
            userName: req.user.displayName, //Get user Name
            layout: '../Views/layouts/game',
        });

    } catch (error) {
        console.log("Error while directing to dashboard " + error);
    }
};

exports.board = async (req, res) => {

    const locals = {
        title: 'Board',
    };

    try {
        const scores = await Leaderboard.find().sort({ score: -1 }); // Newest scores first

        res.render('dashboard/board', {
            user: req.user,
            scores: scores,
            userName: req.user.displayName, //Get user Name
            layout: '../Views/layouts/dashboard',
        });

    } catch (error) {
        console.log("Error while directing to dashboard " + error);
    }
};

exports.get_words = async (req, res) => {
    try {

        const words = await WordsSet.find();
        const level = req.query.level;
        const wordsSet = await WordsSet.findOne({ level: level });


        beginner = (await WordsSet.findOne({ level: "beginner" })).words;
        intermediate = (await WordsSet.findOne({ level: "intermediate" })).words;
        advanced = (await WordsSet.findOne({ level: "advanced" })).words;
        custom = (await WordsSet.findOne({ level: "custom" })).words;

        const words_string = wordsSet.words.join(', ');

        
        res.status(200).json({ 
            words: words,
            words_string: words_string,
            beginner: beginner,
            intermediate: intermediate,
            advanced: advanced,
            custom: custom
         });

    } catch (e) {

    }
};

exports.submit_score = async (req, res) => {
    const { username, score } = req.body;

    if (!username || score === undefined) {
        return res.status(400).json({ message: 'Username and score are required' });
    }

    try {
        // Check if the user already has the same score
        const existingEntry = await Leaderboard.findOne({ username, score });

        if (!existingEntry) {
            // Insert a new entry with the current date
            const newEntry = new Leaderboard({ username, score });
            await newEntry.save();
            return res.status(201).json({ message: 'Score saved successfully', newEntry });
        }

        res.status(200).json({ message: 'Score already exists', existingEntry });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};