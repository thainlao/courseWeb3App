import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.js';
import coursRouter from './routes/coureses.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());

//routes

app.use('/api/auth', authRouter)
app.use('/api/course', coursRouter)

async function start () {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION);
        app.listen(PORT, () => console.log(`сервер запущен на ${PORT} порту`))
    } catch (e) {
        console.log(e)
    }
}

start()