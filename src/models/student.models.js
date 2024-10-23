const mongoose = require('mongoose')


const studentSignup = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password:{
        type: String,
        trim: true,
        required: true,
        select: false
    }
    
}, {timestamps: true});


module.exports = mongoose.model("Student", studentSignup);