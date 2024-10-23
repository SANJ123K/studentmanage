const StudentArticals = require("../models/studentDetails.models")


const checkOwnerShip = async (req, res, next) =>{
    const { id } = req.params;
    const userId = req.user.id;
    
    try{
        const user = await StudentArticals.findById(id);
        if (user.studentId.toString() !== userId.toString()) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to perform this action',
            });
    }}
    catch(error){
        return res.status(400).json({
            status: "fail",
            message: `Error found from databases side : ${error}`
        })
    }

    next();
}

module.exports = { checkOwnerShip };