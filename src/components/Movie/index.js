import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import fanartApi from '../../services/fanartApi';

import {FANART_API_KEY, DEFAULT_MOVIE_POSTER} from '@env';

import Text from '../Text';
import {MovieRow, Photo, Info, NumberOfViewers} from './styles';

const Movie = ({movie, watchers}) => {
    const [photo, setPhoto] = useState(DEFAULT_MOVIE_POSTER);
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
        if (photo === DEFAULT_MOVIE_POSTER) {
            getPhoto();
        }
    });
    return (
        <TouchableOpacity
            testID="movie-touchable"
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
                    <Text
                        testID="movie-title"
                        numberOfLines={2}
                        size="16px"
                        weight="bold">
                        {movie.title}
                    </Text>
                    <Text testID="movie-year">{movie.year}</Text>
                    {watchers && (
                        <NumberOfViewers>
                            <Icon name="user" color="#fff" size={20} />
                            <Text testID="movie-watchers" numberOfLines={1}>
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
