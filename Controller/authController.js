const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req,res,next) => {

        const newUser = await User.create(req.body);
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        res.status(201).json({
            message : 'success',
            token,
            data : {
                user : newUser
            }
        });
    
})