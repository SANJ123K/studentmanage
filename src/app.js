const express = require("express");
const router = require("./routes/router.js");
const authRouter = require("./routes/authRouter.js")
const enrollRouter = require("./routes/studentEnroll.js")
const app = express();


app.use(express.json())

app.use('/api/v1/student/article', router)
app.use('/api/v1/student', authRouter)
app.use('/api/v1/student/',enrollRouter)



module.exports = { app }