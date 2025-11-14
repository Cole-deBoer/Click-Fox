import axios from 'axios';

const UpdateUserStats = async (uid = '', statName = '', statValue = 0, token = '', logResponse = false) => {

    let data = JSON.stringify({
        "results": {
            "uid": uid,
            [statName]: parseFloat(statValue)
        }
    });
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/results',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        },
        data : data
    };

    try {
        const response = await axios.request(config);

        if(logResponse) {
            if(response.status === 200) {
                console.log(response.data);
            } else {
                console.error(JSON.stringify(response.data));
            }
        }
        return response;        
    } catch (error) {
        console.error('error sending results', error);
    }
}

export default UpdateUserStats;