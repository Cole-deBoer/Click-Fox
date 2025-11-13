import express from 'express';
import {MongoClient} from 'mongodb';
import cors from 'cors';
import env from 'dotenv';

// Routers
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import resultsRouter from './routes/resultsRoutes.js';

import {connectToDB} from './database.js' 

env.config();
const app = express();

// Use cors middleware with explicit options
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow sending of cookies and authorization headers
    allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly allow Content-Type and Authorization
}));

app.use(express.json()); // To parse JSON bodies

const uri = process.env.MONGO_URI;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	
    await client.connect();
    console.log("Successfully connected to MongoDB!");

    // Link mongoose to MongoDB
    await connectToDB();
    
    app.use('/api', authRouter, userRouter, resultsRouter);
    
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    })
    
  } catch (error) {
    console.error(error);
  }
}
run();