const { Console } = require("../models/consoles.model");
const { gamesInconsole } = require("../models/gamesInConsole.model");
const { catchAsync } = require("../utils/catchAsync.util");

const {Game } = require('../models/games.model')

const addConsole = catchAsync(
    async ( req,res,next) => {

        const { name , company } =req.body;

        const newConsole = await Console.create({
            name,
            company
        })

        res.status(201).json({
            status:"succes",
            newConsole
        })
    }
)

const getConsoles = catchAsync(
    async (req,res,next) => {
        
        const consoles = await Console.findAll( {
            where: { status:'active'},
            include: [{model: Game ,attributes:["title"]}]  //Include, juegos disponbiles para esta consola
        });
   

        res.status(200).json({
            status:"succes",
            consoles
        })
    }
)

const updateTitleConsole = catchAsync(
    async (req,res,next) => {
       const { console } =req;

       const {name} = req.body;

       await console.update(
        {name}
        )

        res.status(200).json({
            status:"succes"
        })
    }
)

const deleteConsole  = catchAsync(
    async (req,res,next) => {
        const { console } = req;

        await console.update({status:"disabled"})
       
        
        res.status(200).json(
            {
                status:"succes"
            }
        )
    }
)

const assignGame = catchAsync(
    
    async (req,res,next) => {
        const {gameId, consoleId} = req.body
        const  gameInConsole = await gamesInconsole.create({
            gameId,
            consoleId
        })

        console.log(gameInConsole)

        res.status(200).json({
            status:"succes"
        })
    }
)



const test = catchAsync(
    async (req,res,next) => {

        const consol = await gamesInconsole.findAll();

                        //Include, juegos disponbiles para esta consola

        res.status(200).json({
            status:"succes",
            consol
        })

    }
)






module.exports = { addConsole , getConsoles, updateTitleConsole, deleteConsole,assignGame,test}