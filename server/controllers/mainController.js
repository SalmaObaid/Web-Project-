// get homepage

const WordsSet = require('../models/WordsSet.js');

exports.homepage = async (req, res) => {
    const locals = {
        title: 'تخمينة',
        description: 'خمن الكلمات الصحيحة'
    }

    const words = await WordsSet.find();

    res.render('index', {
        locals,
        user: req.user,
        words,
        layout: '../Views/layouts/front-page'
    });
}

// get about

exports.login = async (req, res) => {
    const locals = {
        title: 'Login Page',
    }
    res.render('login', {
        locals,
        user: req.user,
    });

}

exports.signup = async (req, res) => {
    const locals = {
        title: 'SignUp Page',
    }
    res.render('signup', {
        locals,
        user: req.user,
        layout: '../Views/layouts/main'
    });

}