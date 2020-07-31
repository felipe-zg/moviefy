import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import Routes from './Routes';
import store from './store';

// import { Container } from './styles';

const App = () => {
    return (
        <Provider store={store}>
            <StatusBar backgroundColor="#1d334a" barStyle="light-content" />
            <Routes />
        </Provider>
    );
};
export default App;
