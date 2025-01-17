import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async() => {
    console.log(process.env.MONGO_URI)
    try {
        await mongoose.connect(process.env.MONGO_URI)
    }catch(err){
            console.log(`Error: ${err.message}`)
        }
}


export default connectDB;