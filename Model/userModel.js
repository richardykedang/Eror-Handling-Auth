const mongoose = require('mongoose');
const validator = require('validator');

//name, email, password
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
        
    },
    email: {
        type: String,
        required: [true, 'Please Provide Your email'],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail,'Please Provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please Provide a password'],
        minlength: 8,
    }
    
});


const User = mongoose.model('User',userSchema);

module.exports = User;