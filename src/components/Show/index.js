import React from 'react';
import {View, Text} from 'react-native';
import poster from '../../assets/images/poster.jpg';

import {MovieRow, Photo, Info} from './styles';

const Show = ({show, watchers}) => {
    return (
        <MovieRow>
            <Photo source={poster} />
            <Info>
                <Text>{show.title}</Text>
                <Text>{show.year}</Text>
                <Text>{watchers}</Text>
            </Info>
        </MovieRow>
    );
};

export default Show;
