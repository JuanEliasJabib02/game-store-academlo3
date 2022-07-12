const express = require('express');

const { validateUser } = require('../middleware/user.middleware');

//gamExist


// CONTROLLERS

const { createGame, getGames, updateGame, deleteGame } = require('../controllers/games.controller');
const { gameExist } = require('../middleware/games.middleware');


const gamesRouter = express.Router();



// ENDPOINTS


gamesRouter.post('/',validateUser, createGame);
gamesRouter.get('/', getGames);
gamesRouter.patch('/:id', validateUser, gameExist,updateGame);
gamesRouter.delete('/:id', validateUser,gameExist, deleteGame);
gamesRouter.post('/:reviews/:gameId', validateUser,/* add review */);


 module.exports  = { gamesRouter }




