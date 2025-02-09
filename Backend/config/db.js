const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)     
        console.log('Db connected');
    }
    catch(e){
        console.log(e);
    }
}

module.exports = connectDB;