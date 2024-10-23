const jwt = require("jsonwebtoken");
const studentSignup = require("../models/student.models.js");
const bcrypt = require('bcryptjs');
const util = require('util');

const signToken = id => {
    return jwt.sign({'id': id}, process.env.JWT_SECRET_STR)
}

const signUp = async (req, res) => {
    const {name, email, password} = req.body;
    
    if(!name || !email || !password){
        return res.status(400).json({
            status:"fail",
            message:"missing data for signup"
        })
    }
    
    // check student already present
    const checkStudent = await studentSignup.findOne({email:{$eq: email}})
    if(checkStudent){
        return res.status(400).json({
            status:"fail",
            message:"user alread present"
        })
    }
    const incryptPass = await bcrypt.hash(password, 12);
    const student = new studentSignup({
        name,
        email,
        password: incryptPass,
    })

    try{
        await student.save();
        const token = signToken(student._id)
        res.status(201).json({
            status: "success",
            token,
            data:{
                student: student
            }
        })
    }
    catch (error){
        res.status(404).json({
            status: "fail",
            message: `Error occur at save data error: ${error}`
        })
    }
}


// login the user
const login = async (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;

    if( !email || !password ){
        return res.status(400).json({
            status: "fail",
            message: "Provide email and password"
        })
    }
    
    const studentObj = await studentSignup.findOne({email}).select('+password')
    
    
    if(!studentObj || !await bcrypt.compare(password, studentObj.password)){
        res.status(400).json({
            status: "fail",
            message: "Does not have any account"
        })}
    else{
        const token = signToken(studentObj._id)
        res.status(200).json({
            status:"success",
            token
        })
    }

}


// protect the routes
const protect = async ( req, res, next) =>{

    // read the token
    const testToken = req.headers.authorization;

    let token;
    if(testToken && testToken.startsWith('bearer')){
       token = testToken.split(' ')[1];
    }

    if( !token ){
        return res.status(401).json({
            status: "fail",
            message: "your are not authorize"

        })
    }
   // validate the token 
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_STR)
    
   // now check user is exists
   const user = await studentSignup.findById(decodeToken.id)
   
   if(!user){
     return res.status(401).json({
        status: "fail",
        message: "the user token does not exists"
     })
   }
   // given the access to the user
   next();

}








module.exports = {signUp, login, protect}