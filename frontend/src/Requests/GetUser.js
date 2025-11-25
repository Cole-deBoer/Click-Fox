import axios from 'axios';

/**  returns the response of the request, this is standard for all requests in this codebase.
    the uid can either be a username or a password. this conforms to the requirements of the backend.
*/
const getUser = async (uid ='', logResponse = false, setError = (errorMessage) => {}) => {    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://us-central1-click-fox.cloudfunctions.net/api/user/${uid}`
      };
    
    const response = await axios.request(config);
    if(logResponse) {
        if(response.status === 200){
            console.log(response.data)
        }
        else {
            setError(response.message);
            console.error(response);
        }
    }
    return response;
} 

export default getUser;