import userModel from '../models/userModel.js'

// Function used for creating users in the database.
// This should be in an Auth proteced endpoint. 
// This should only be called once per user. 
export const createUser = async (req, res) => {
    try {
        const {username, email, firebaseUid, testsTaken, maxCPSOneSecond, maxCPSFiveSeconds,
            maxCPSTenSeconds, maxCPSFiveClicks, maxCPSTenClicks} = req.body;
        
        console.log('Incoming request headers:', req.headers);

        if(!username || username === '') {
            console.log('missing username');
            return res.status(400).json({message: 'missing username in request body'});
        }

        if(!email || email === '') {
            console.log('missing email')
            return res.status(400).json({message: 'missing email in request body'});
        }
        if(!firebaseUid || firebaseUid === '') {
            console.log('missing firebaseUid')
            return res.status(400).json({message: 'missing firebaseUid in request body'});
        }

        // Check if user already exists by firebaseUid
        let user = await userModel.findOne({ firebaseUid: firebaseUid });

        if (user) {
            // If user exists but no username, update it
            if (!user.username) {
                user.username = username;
                await user.save();
                return res.status(200).json({message: 'Username updated successfully'});
            } else {
                // User with firebaseUid and username already exists
                console.log('Sending 409 (Firebase UID conflict) response with headers:', res.getHeaders());
                return res.status(409).json({message: 'User with this Firebase UID already exists with a username'});
            }
        }

        // Check if username is already taken by a different user
        const existingUsername = await userModel.findOne({ username: username });
        if (existingUsername) {
            console.log('Sending 409 (Username taken) response with headers:', res.getHeaders());
            return res.status(409).json({ message: 'Username already taken' });
        }

        // Check if email is already taken by a different user
        const existingEmail = await userModel.findOne({ email: email });
        if (existingEmail) {
            console.log('Sending 409 (Email taken) response with headers:', res.getHeaders());
            return res.status(409).json({ message: 'Email already registered' });
        }

        const newUser = new userModel({username, email, firebaseUid, testsTaken, maxCPSOneSecond, maxCPSFiveSeconds,
            maxCPSTenSeconds, maxCPSFiveClicks, maxCPSTenClicks});
        await newUser.save();

        console.log('Sending 201 (User registered) response with headers:', res.getHeaders());
        res.status(201).json({message: 'User registered successfully'});
    } catch (error)
    {
        console.error(error);
        return res.status(500).json({message: 'Internal Server Error', error: error});
    }
}

export const getUser = async (req, res) => {
    try {
        const uid = req.params?.uid;
        
        if(!uid) {
            return res.status(400).json({message: 'username and email is null. Ensure there is either an email or a username in the request params.'});
        }

        let user = null;
        user = await userModel.findOne({username: uid}).lean();
        
        if(!user) {
            user = await userModel.findOne({email: uid}).lean();
            if(!user) {
                return res.status(404).json({message: 'there is no user that corresponds to the provided username or email'});
            }
        }

        // doesnt show the users unique id, email, or firebaseUid to the person fetching the user.
        user._id = "_hidden_";
        user.email = "_hidden_";
        user.firebaseUid = "_hidden_";

        res.status(200).json(user);
    } catch (error)
    {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', error: error});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const uid = req.params?.uid;

        if (!uid) {
            return res.status(400).json({ message: 'Username or email not provided in request parameters' });
        }

        let result = await userModel.deleteOne({ username: uid });
        
        if (result.deletedCount === 0) {
            result = await userModel.deleteOne({ email: uid });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
        }

        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
}