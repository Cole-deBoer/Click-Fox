import axios from 'axios';

const GetToken = async (email = '', password = '', logResponse = false) => {

    let data = JSON.stringify({
        "email": email,
        "password": password,
        "returnSecureToken": true
    });
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAU8oEmzG25htSzljF8dMb4-2TpsZDIFYg',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    };

    try {
        const response = await axios.request(config);

        if(logResponse) {
            if(response.status === 200) {
                console.log(JSON.stringify(response.data));
            } else {
                console.error(response);
            }
        }
        return response;        
    } catch (error) {
        console.error('error sending results', error);
    }
}

export default GetToken;