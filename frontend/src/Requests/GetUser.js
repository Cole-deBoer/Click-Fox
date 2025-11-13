import axios from 'axios';

/**  returns the response of the request, this is standard for all requests in this codebase.
    the uid can either be a username or a password. this conforms to the requirements of the backend.
*/
const getUser = async (uid ='', logResponse = false) => {    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/api/user/${uid}`
      };
    
    const response = await axios.request(config);
    if(logResponse) {
        if(response.status === 200){
            console.log(response.data)
        }
        else {
            console.error(response);
        }
    }
    return response;
} 

export default getUser;