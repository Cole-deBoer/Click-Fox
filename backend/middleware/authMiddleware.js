import {auth} from '../firebase.js'

// Function for verifying the token  of a user
// req is expecting a Bearer at index 1 in the header
// res will return the status of the verification
export const verifyToken = async (req, res, next) => {
    const header = req.headers.auth;
    if(!header) return res.status(401).json({message: 'Missing or invalid token'});

    const token = header.split('Bearer ')[1];

    try {
        const decodedToken = await auth.verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch(error) {
        console.error(error);
        return res.status(401).json({message: 'Token Verification Failed', error: error})
    }
};
