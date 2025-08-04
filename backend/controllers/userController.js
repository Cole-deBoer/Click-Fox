import userModel from '../models/userModel.js'

// Function used for creating users in the database.
// This should be in an Auth proteced endpoint. 
// This should only be called once per user. 
export const createUser = async (req, res) => {
    try {
        const {username, totalPlayTime, testsTaken,  minReactionTime, 
               maxClicksOneSecond, maxClicksFiveSeconds, maxClicksTenSeconds} = req.body;
        
        if(!username) {
            return res.status(400).json({message: 'missing username in request body'});
        }

        const newUser = new userModel({username, totalPlayTime, testsTaken,  minReactionTime, 
                                       maxClicksOneSecond, maxClicksFiveSeconds, maxClicksTenSeconds});
        await newUser.save();

        res.status(201).json({message: 'User registered successfully'});
    } catch (error)
    {
        console.error(error);
        return res.status(500).json({message: 'Internal Server Error', Error: error});
    }
}

export const getUserByUsername = async (req, res) => {
    try {
        const username = req.params.username;

        if(!username) {
            return res.status(400).json({message: 'username is null'});
        }

        const user = await userModel.findOne({username: username}).lean();

        if(!user) {
            return res.status(404).json({message: 'there is no user that corresponds to the provided username'});
        }

        res.status(200).json(user);
    } catch (error)
    {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', Error: error});
    }
}