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
app.use(cors());
app.use(express.json())

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