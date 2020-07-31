import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen" headerMode="none">
                <Stack.Screen name="HomeScreen" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
