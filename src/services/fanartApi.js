import Axios from 'axios';

export default Axios.create({
    baseURL: 'http://webservice.fanart.tv/v3/',
    headers: {
        'Content-Type': 'application/json'
    }
});
