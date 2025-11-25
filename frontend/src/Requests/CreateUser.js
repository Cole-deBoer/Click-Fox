import axios from 'axios';

/**  returns the response of the request, this is standard for all requests in this codebase.
*/
const createUser = async (username = '', email = '', firebaseUid = '', logResponse = false, setError = (errorMessage) => {}) => {
    let data = JSON.stringify({
        "username": username,
        "email": email,
        "firebaseUid": firebaseUid,
        "totalPlayTime": 0,
        "testsTaken": 0,
        "maxCPSOneSecond": 0,
        "maxCPSFiveSeconds": 0,
        "maxCPSTenSeconds": 0,
        "maxCPSFiveClicks": 0,
        "maxCPSTenClicks": 0
    });
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://us-central1-click-fox.cloudfunctions.net/api/user/create',
        headers: { 
            'Content-Type': 'application/json', 
        },
        data : data
    };
    
    const response = await axios.request(config);
    if(logResponse) {
        if(response.status === 201){
            console.log(response.data.message);
        }
        else {
            setError(response.message);
            console.error(response);
        }
    }
    return response;
} 

export default createUser