const { Console } = require("../models/consoles.model");
const { catchAsync } = require("../utils/catchAsync.util");

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
        
        const consoles = await Console.findAll( {where: { status:'active'}});

                        //Include, juegos disponbiles para esta consola

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




module.exports = { addConsole , getConsoles, updateTitleConsole, deleteConsole}