const express = require('express');
const { addConsole, getConsoles, updateTitleConsole, deleteConsole, assignGame, test } = require('../controllers/console.controller');
const { consoleExist } = require('../middleware/console.middleware');
const { validateUser } = require('../middleware/user.middleware');


const consoleRouter = express.Router();


//ADDCONSOLE

consoleRouter.post('/',validateUser,addConsole)
consoleRouter.get('/', validateUser,getConsoles)
consoleRouter.patch('/:id', validateUser,consoleExist, updateTitleConsole)
consoleRouter.delete('/:id',validateUser,consoleExist, deleteConsole)

consoleRouter.post('/assign-game', assignGame) // Para asignar los juegos que estan en cada consola relacion mucho a muchos














consoleRouter.get('/test', test)
module.exports = { consoleRouter }