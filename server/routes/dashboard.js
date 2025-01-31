 const express = require('express');
 const router = express.Router();
 const {isLoggedIn} = require('../middleware/checkAuth');
 const dashboardController = require('../controllers/dashboardController');

 // add isLoggedIn 
 router.get('/dashboard', dashboardController.dashboard); //to redirect user must be logged in
 router.get('/play-game', dashboardController.play_game); //to redirect user must be logged in
 router.get('/board', dashboardController.board); //to redirect user must be logged in
 router.post('/submit-score', dashboardController.submit_score); //to redirect user must be logged in

  module.exports=router; 