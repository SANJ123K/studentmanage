const  mongoose = require("mongoose");


const enrollSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', 
        required: true,
    },
    course:{
        type: String,
        required: true,
        trim: true,
    },
    
    duration:{
        type: Number,
        requierd: true,
        trim: true,
    }

}, {timestamps: true});

const enroll = mongoose.model("Enroll", enrollSchema);
module.exports = {enroll}