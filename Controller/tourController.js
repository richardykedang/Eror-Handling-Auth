const { match } = require('assert');
const fs = require('fs');
const { Query } = require('mongoose');
const Tour = require('../Model/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
const catchAsync = fn => {
    return(req, res, next) => {
        fn(req, res, next).catch(next)
    }
   
}


exports.getAlltours = catchAsync(async (req, res) => {

    const features = new APIFeatures (Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
    const tours = await features.query;

    res.status(200).json({
        message : 'success',
        result : tours.length,
        data : {
            tours
            }
        }); 
    
});

// exports.getTour = (req, res) => {
//     console.log(req.params);
//     const id = req.params.id * 1;
//     const tour = tours.find(el => el.id === id);
//     //console.log(tour)
    
//     res.status(200).json({
//         status : 'success',
//         data : {
//             tour
//         }
//     }) 
// };

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id)
        //const tour = await Tour.find({_id: req.params.id})
        res.status(200).json({
            status : 'success',
            data : {
                tour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: "Invalid Id"
        })
    }
    
};

// exports.createTour = (req,res) => {
//     //console.log(req.body);
//     newId = tours[tours.length - 1].id + 1;
//     //console.log(newId);
//     newTour = Object.assign({id : newId}, req.body);
//     tours.push(newTour);

//     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), (err) => {
//         res.status(200).json({
//             message : 'success',
//             data : {
//                 tours : newTour
//             }
//         })
//     })
//     //res.send("Done");
// };

exports.createTour = async (req,res) => {
    try{

        const newTour = await Tour.create(req.body);

        res.status(201).json({
            message : 'success',
            data : {
                tours : newTour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
    
   
    //res.send("Done");
};

// exports.updateTour = (req, res) => {
//     const id = req.params.id * 1;
//     const tour = tours.find(el => el.id === id);
    
//     res.status(200).json({
//         status : 'success',
//         data : {
//             tours : '<updated here>'
//         }
//     })
// };

exports.updateTour = async (req, res) => {
    try{

        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true
        })
    
        res.status(200).json({
            status : 'success',
            data : {
                tour
            }
        })
    } catch(err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
    
};

// exports.deleteTour = (req, res) => {
//     const id = req.params.id * 1;
//     const tour = tours.find(el => el.id === id);

//     res.status(204).json({
//         status : 'succes',
//         data : null
//     })
// };

exports.deleteTour = async (req, res) => {
    try {

        await Tour.findByIdAndDelete(req.params.id)

            res.status(204).json({
                status : 'succes',
                data : null
            })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }

};