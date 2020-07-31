import {combineReducers} from 'redux';

import Show from './Show/reducer';
import Trending from './Trending/reducer.js';

export default combineReducers({
    Show,
    Trending
});
