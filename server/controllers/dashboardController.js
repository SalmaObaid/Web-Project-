const WordsSet = require('../models/WordsSet.js');

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

        const words = await WordsSet.find();
        const level = req.query.level;
        const wordsSet = await WordsSet.findOne({ level: level });

        if (!wordsSet) {
            return res.status(404).send("Category not found");
        }
        const words_string = wordsSet.words.join(', ');
        res.render('dashboard/play-game', {
            user: req.user,
            words: words,
            words_string: words_string,
            game_level: level,
            wordleWord: req.session.wordleWord,
            userName: req.user.displayName, //Get user Name
            layout: '../Views/layouts/game',
        });

    } catch (error) {
        console.log("Error while directing to dashboard " + error);
    }
};