

const express = require('express')
const app = express() 
app.use(express.json())
const {AppError} = require('./utils/appError.util');
const { globalErrorHandler} = require('./controllers/error.controller')
//ROUTERS
const { usersRouter } = require('./routes/user.routes')

const { gamesRouter } = require('./routes/games.routes');
const { consoleRouter } = require('./routes/console.routes');


//ENDPOINTS

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/games', gamesRouter);
app.use('/api/v1/consoles', consoleRouter);



/* Para mostrar un error cuando ningun endpoint pueda procesar la peticion , ej: el cliente coloco mal la ruta(url) */
app.all('*',(req ,res ,next) => {
    next(new AppError (`${req.method} ${req.url} not found in this server`, 404))
     
 })


// Global error handler -> Para que cualquier error que llegue a ocurrir llegue aca
/*  Express siempre maneja como primer argumento el error cuando le pasamos 4 argumentos */
app.use(globalErrorHandler);



module.exports = { app }