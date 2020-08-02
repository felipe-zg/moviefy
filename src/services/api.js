import Axios from 'axios';
import {TRAKT_API_KEY} from '@env';

export default Axios.create({
    baseURL: 'https://api.trakt.tv',
    headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': 2,
        'trakt-api-key': TRAKT_API_KEY
    }
});
