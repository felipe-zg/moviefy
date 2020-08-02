import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import Details from '../pages/Details';
import Load from '../pages/Load';
import WebSite from '../pages/WebSite';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoadScreen" headerMode="none">
                <Stack.Screen name="HomeScreen" component={Home} />
                <Stack.Screen name="DetailsScreen" component={Details} />
                <Stack.Screen name="LoadScreen" component={Load} />
                <Stack.Screen name="WebSiteScreen" component={WebSite} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
