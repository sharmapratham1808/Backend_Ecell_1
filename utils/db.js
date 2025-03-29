const mongoose = require("mongoose")

const URL = process.env.MONGODB_URL;


const connectDb = async() => {
    try {
        await mongoose.connect(URL);
        console.log(`connection sucessful to DB`)
    } catch (error) {
        console.error("Database connection failed")
        process.exit(0);
    }
}

module.exports = connectDb;