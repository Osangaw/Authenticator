

import mongoose from 'mongoose';
import dotenv from 'dotenv';
const connect = mongoose.connect(process.env.MONGO_URL);
dotenv.config();
connect.then(() => {
    console.log('Database connected successfully');
}) 
.catch(()=>{
    console.log('Database cannot be connected');
});

const LoginSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model('users', LoginSchema);

module.exports = collection;