
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

        const games = await Game.findAll( {
            attributes:["title","genre"],
            where: { status:'active'},
            include: {model: Console, attributes:["name","company"]}
        });

        res.status(200).json({
            status:"succes",
            games
        })

        console.log(games)
    }
)

const updateGame = catchAsync(
    async (req,res,next) => {
    
        const { game } = req;

        const {title} = req.body;

        await game.update({ title})

        res.status(204).json(
        {
            status:"sucess",
        })
        }
)


const deleteGame = catchAsync(
    async (req,res,) => {

        const { game } = req;

        await game.update({status:"disabled"})
       
        
        res.status(200).json(
            {
                status:"succes"
            }
        )
       
    })

    const addReview = catchAsync(
        async (req,res,next) => {
            console.log("work")
        }
    )

  


module.exports = { createGame ,getGames, updateGame, deleteGame ,addReview}