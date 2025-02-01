import 'dotenv/config'
import mongoose from 'mongoose';
import express from 'express'
import connectDB from './db/connect.js';
import auth from './router/auth.router.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import mlDataRouter from './router/mlData.router.js';
import pointsRouter from './router/points.router.js';
import expertsRouter from './router/getExperts.js';
import emailRoutes from './router/emailRoutes.js';
import userDataRouter from './router/getUser.router.js';
// import report from './router/report.router.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', auth);
app.use('/image', mlDataRouter);
app.use('/image', pointsRouter);
app.use('/api', expertsRouter);
app.use('/api', userDataRouter);
// app.use('/report', report);

// app.use('/api', (req, res, next) => {
//     console.log("Request Body:", req.body); // Logs incoming data
//     next();
// });

app.use("/api/email", emailRoutes);
connectDB();

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(3000, () => {
      console.log(`Server is running on port ${3000}`)
    })
  })
