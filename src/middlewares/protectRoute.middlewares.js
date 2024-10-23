const jwt = require("jsonwebtoken");
const studentSignup  = require("../models/student.models.js")

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
    req.user = decodeToken

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

module.exports = protect;