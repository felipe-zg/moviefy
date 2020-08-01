import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import Details from '../pages/Details';
import Search from '../pages/Search';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen" headerMode="none">
                <Stack.Screen name="HomeScreen" component={Home} />
                <Stack.Screen name="DetailsScreen" component={Details} />
                <Stack.Screen name="SearchScreen" component={Search} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
