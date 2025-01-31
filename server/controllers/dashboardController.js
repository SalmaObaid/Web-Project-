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
