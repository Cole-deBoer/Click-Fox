import express from 'express';
import {MongoClient} from 'mongodb';
import cors from 'cors';
import env from 'dotenv';
import mysql from 'mysql2/promise';

const app = express();
env.config();
app.use(cors());
app.use(express.json)

const uri = `mongodb+srv://ADMIN:${encodeURIComponent(process.env.DB_PASSWORD)}@clickfox-dev-cluster.ldxr4nk.mongodb.net/?retryWrites=true&w=majority&appName=clickfox-dev-cluster`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	
    await client.connect();
    console.log("Successfully connected to MongoDB!");

    // ROUTES:

    app.get("/api/login")


    // END ROUTES:
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`)
    })

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
