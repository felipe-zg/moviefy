import React from 'react';
import {View, Text} from 'react-native';

// import { Container } from './styles';

const Details = ({route}) => {
    const {show} = route.params;
    return (
        <View>
            <Text>Detalhes do filme</Text>
            <Text>{show.title}</Text>
        </View>
    );
};
export default Details;
