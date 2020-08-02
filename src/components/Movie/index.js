import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import fanartApi from '../../services/fanartApi';

import Text from '../Text';
import {MovieRow, Photo, Info, NumberOfViewers} from './styles';

const FANART_API_KEY = '63408126185cd1fbcbf87266fa27b5c0';
const DEFAULT_POSTER =
    'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80';

const Movie = ({show: movie, watchers}) => {
    const [photo, setPhoto] = useState(DEFAULT_POSTER);
    const navigation = useNavigation();
    useEffect(() => {
        const getPhoto = async () => {
            if (movie.ids.imdb) {
                fanartApi
                    .get(`/movies/${movie.ids.imdb}?api_key=${FANART_API_KEY}`)
                    .then((response) => {
                        setPhoto(response.data.movieposter[0].url);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        };
        if (photo === DEFAULT_POSTER) {
            getPhoto();
        }
    });
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('DetailsScreen', {movie, photo});
            }}>
            <MovieRow>
                <Photo
                    source={{
                        uri: photo
                    }}
                />
                <Info>
                    <Text numberOfLines={2} size="16px" weight="bold">
                        {movie.title}
                    </Text>
                    <Text numberOfLines={1}>{movie.year}</Text>
                    {watchers && (
                        <NumberOfViewers>
                            <Icon name="user" color="#fff" size={20} />
                            <Text numberOfLines={1}>
                                {watchers} people watching
                            </Text>
                        </NumberOfViewers>
                    )}
                </Info>
            </MovieRow>
        </TouchableOpacity>
    );
};

export default Movie;
