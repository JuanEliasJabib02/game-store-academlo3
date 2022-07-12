const express = require('express');

const { validateUser } = require('../middleware/user.middleware');

// CONTROLLERS

const { createGame, getGames } = require('../controllers/games.controller');


const gamesRouter = express.Router();



// ENDPOINTS


gamesRouter.post('/',validateUser, createGame);
gamesRouter.get('/', getGames);
gamesRouter.patch('/:id', validateUser,/* update game(onyltitle) */);
gamesRouter.delete('/id', validateUser,/* deletegame */);
gamesRouter.post('/:reviews/:gameId', validateUser,/* add review */);


 module.exports  = { gamesRouter }




