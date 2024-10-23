const { app } = require("./app.js")
const { dataBase } = require("./database/db.js")
const dotenv = require("dotenv");

dotenv.config();

dataBase()
.then(()=>{
    app.listen(process.env.HOST, () =>{
        console.log(`server runing on port: ${process.env.HOST}`);
    })
})
.catch((error)=>{
    console.log(`Mongodb connection failed !!! ${error}`)
})