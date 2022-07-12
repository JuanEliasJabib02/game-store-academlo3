
//Utils
const {catchAsync} =require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const { Game } = require('../models/games.model');
const { Console } = require('../models/consoles.model');
const { Review } = require('../models/reviews.model');

const createGame = catchAsync(

    async (req,res,next) => {
        
        const { title,genre } = req.body;

        const newGame = await Game.create({
            title,
            genre,

        })



        res.status(201).json({
            status:"succes",
            newGame,
        });
    }
)

const getGames = catchAsync(
    async (req,res,next) => {

        const games = await Game.findAll({
            include:{model: Console},
            include:{model: Review},
        })

        res.status(200).json({
            status:"succes",
            games
        })

        console.log(games)
    }
)

module.exports = { createGame ,getGames}