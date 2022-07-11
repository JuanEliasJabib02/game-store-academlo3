const { db } = require("../utils/database.util");

const gamesInconsole = db.define('gamesinconsole',{
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