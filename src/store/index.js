import {createStore, composeStoreWithMiddleware, applyMiddleware} from 'redux';
import rootReducer from './modules';
import promise from 'redux-promise-middleware';

export default createStore(rootReducer);
