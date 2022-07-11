const { Sequelize, DataTypes} = require('sequelize') 

const dotenv= require('dotenv') // Para importar la libreria dotenv y poder usar las variables de entorno   
           
const db = new Sequelize({
    dialect:'postgres', 
    host: process.env.DB_HOST, 
    username:'postgres', // PREGUNTAR XQ FALLA ESTE 
    password:"pass1234", 
    port:process.env.DB_PORT,
    database:process.env.DB,
    logging: false  /* Activar si necesito ver la consulta y debuggear */
})

module.exports = { db  , DataTypes} // Exporto al conexion de la base de dato al modelo 