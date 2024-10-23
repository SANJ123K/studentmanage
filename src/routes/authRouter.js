const authRouter = require("express").Router();
const {signUp, login} = require("../controllers/studentAuth.controllers")


authRouter.route('/signup').post(signUp)
authRouter.route('/login').post(login)


module.exports = authRouter 