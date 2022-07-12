const express = require('express');
const { addConsole, getConsoles, updateTitleConsole, deleteConsole } = require('../controllers/console.controller');
const { consoleExist } = require('../middleware/console.middleware');
const { validateUser } = require('../middleware/user.middleware');


const consoleRouter = express.Router();


//ADDCONSOLE

consoleRouter.post('/',validateUser,addConsole)
consoleRouter.get('/', validateUser,getConsoles)
consoleRouter.patch('/:id', validateUser,consoleExist, updateTitleConsole)
consoleRouter.delete('/:id',validateUser,consoleExist, deleteConsole)

module.exports = { consoleRouter }