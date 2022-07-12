const { db , DataTypes} = require("../utils/database.util");

const gamesInconsole = db.define('gamesInConsole',{
    
    id:{
        primaryKey:true,
        autoIncrement:true,
        type: DataTypes.INTEGER,
        allowNull:false
    },
    gameId:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    consoleId:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active' 
    }
})


module.exports = { gamesInconsole }