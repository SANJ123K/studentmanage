const {enroll} = require("../models/studentenroll.models")



const addCourse = async (req, res) =>{
    try {
        
        const { course, duration } = req.body;
        const userId = req.user.id;
        if(!course || !duration){
            return res.status(400).json({
                status:"fail",
                message: "Required Data is missing",
            })
        }
        const enrollment = new enroll({
            studentId: userId,
            course,
            duration,
        });
        await enrollment.save();
        res.status(201).json(enrollment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getEnrollment = async (req, res) => {
    const userId = req.user.id
    try {
        const enrollments = await enroll.find({ studentId: userId});
        res.status(200).json(enrollments);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const updateEnroll = async (req, res) =>{
    const userId = req.user.id;
    try {
        const enrollment = await enroll.findOneAndUpdate(
            { _id: req.params.id, studentId: userId },
            req.body,
            { new: true }
        );
        if (!enrollment) return res.status(404).send("Enrollment not found.");
        res.json(enrollment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


const deleteEnroll = async (req, res) =>{
    try {
        const enrollment = await enroll.findOneAndDelete({
            _id: req.params.id,
            studentId: req.user.id,
        });
        if (!enrollment) return res.status(404).send("Enrollment not found.");
        res.json({ message: "Enrollment deleted." });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
module.exports = {addCourse, getEnrollment, updateEnroll, deleteEnroll}