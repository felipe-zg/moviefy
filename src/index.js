import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import Routes from './Routes';

// import { Container } from './styles';

const App = () => {
    return (
        <>
            <StatusBar backgroundColor="#1d334a" barStyle="light-content" />
            <Routes />
        </>
    );
};
export default App;
