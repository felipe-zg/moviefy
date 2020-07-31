import React from 'react';
import {View, Text} from 'react-native';

import {MovieRow} from './styles';

const Show = ({show, watchers}) => {
    return (
        <MovieRow key={show.ids.imdb}>
            <Text>{show.title}</Text>
            <Text>{show.year}</Text>
            <Text>{watchers}</Text>
        </MovieRow>
    );
};

export default Show;
