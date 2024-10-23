const mongoose = require('mongoose');


const StudentDetailsSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', 
        required: true,
    },
    article:{
        type: String,
        trim: true,
        require: true
    }
}, { timestamps: true });


const StudentArticals = mongoose.model('StudentArticals', StudentDetailsSchema);

module.exports = StudentArticals;
