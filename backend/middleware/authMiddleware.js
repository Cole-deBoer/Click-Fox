import {auth} from '../firebase.js'

// Function for verifying the token of a user. Ensure that the passed token is the Firebase token.
// method may not work properly if passed the GoogleAuthProvider token or the GithubAuthProvider token.
// req is expecting a Bearer the header
// res will return the status of the verification
export const verifyToken = async (req, res, next) => {
    const header = req.headers.authorization;
    if(!header) return res.status(401).json({message: 'Missing or invalid token'});

    // We are splitting the header string to only look at what comes after 'Bearer '.
    // Whatver comes after this value will be our token.  
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