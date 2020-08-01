import {combineReducers} from 'redux';

import Movies from './Movies/reducer';
import Trending from './Trending/reducer';

export default combineReducers({
    Movies,
    Trending
});
