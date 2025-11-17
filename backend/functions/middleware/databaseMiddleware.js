// this is middleware that connects our function to mongoDB atlas using the mongoose ODM

const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');

const connectClient = async (req, res, next) => {
    try {
        const uri = process.env.MONGO_URI;
        
        if(!uri) {
            console.error('no URI could be found for the mongoDB atlas connection string, connection failed');
            return res.status(404).json({message: 'no connection string found in .env file'});
        }
        
        const client = new MongoClient(uri);
        
        if(!client) {
            console.error('mongo client was not created, connection failed');
            return res.status(400).json({message: 'failed to create mongoclient using the provided uri'});
        }
        
        // Link mongoose to MongoDB
        mongoose.connect(process.env.MONGO_URI, {dbName : process.env.MONGO_DB_NAME}).then((connection) => {
            if(!connection) {
                console.error('connection with mongoose odm was not established')
                return res.status(400).json({message : 'request failed during mongoose odm connection'});
            }
            next();
        }).catch((error) => {
            console.error('Error during mongoose connection', error);
            return res.status(500).json({message: 'internal server error during mongoose connection'}, {error: error});
        });


    } catch(error) {
        console.error('There was an error while connecting the user to the database', error);
        return res.status(500).json({message: 'Internal server error while connecting to DB'}, {error: error})
    }      
} 

module.exports = connectClient;