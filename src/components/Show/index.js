import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import poster from '../../assets/images/poster.jpg';

import Text from '../Text';
import {MovieRow, Photo, Info, NumberOfViewers} from './styles';

const Show = ({show, watchers}) => {
    return (
        <MovieRow>
            <Photo source={poster} />
            <Info>
                <Text numberOfLines={2} size="16px" weight="bold">
                    {show.title}
                </Text>
                <Text numberOfLines={1}>{show.year}</Text>
                <NumberOfViewers>
                    <Icon name="user" color="#fff" size={20} />
                    <Text numberOfLines={1}>
                        {watchers} pessoas já assistiram
                    </Text>
                </NumberOfViewers>
            </Info>
        </MovieRow>
    );
};

export default Show;
