const express = require("express");
const router = require("./routes/router.js");
const authRouter = require("./routes/authRouter.js")
const app = express();

app.use(express.json())

app.use('/api/v1/student', router)
app.use('/api/v1/student', authRouter)



module.exports = { app }