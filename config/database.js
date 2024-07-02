const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
// coonect to the database

const connectDB = async () => {
    try {
        const connected = await mongoose.connect(`${process.env.DB_URL}`);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

module.exports = connectDB;