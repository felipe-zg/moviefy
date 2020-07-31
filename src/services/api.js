import Axios from 'axios';

export default Axios.create({
    baseURL: 'https://api.trakt.tv',
    headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': 2,
        'trakt-api-key':
            '19279ce39ae15ac40553eed3ea10e3584a0c6b4c66037f3fde490d408568a6d6'
    }
});
