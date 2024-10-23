const mongoose = require("mongoose");

const dataBase = async () => {
    try{
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log(`dataBase connected Host:${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.log(`\n connection failed, Error:${error}`);
        process.exit(1);

    }
}

module.exports = { dataBase };