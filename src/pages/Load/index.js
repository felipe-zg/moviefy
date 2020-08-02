import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Lottie from 'lottie-react-native';

import loadAnimation from '../../assets/animations/load.json';

import api from '../../services/api';
import {fetchMovies} from '../../store/modules/Movies/actions';

import Container from '../../components/Container';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
// import { Container } from './styles';

const Load = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        async function loadInitialData() {
            const languages = await api.get('/countries/movies');
            const countries = await api.get('/genres/movies');
            const genres = await api.get('/languages/movies');
            const movies = await api.get('/movies/trending?page=1&limit=40');
            dispatch(fetchMovies(movies.data));
            navigation.navigate('HomeScreen');
            // dispatch();
            // dispatch();
            // dispatch();
        }
        const movies = loadInitialData();
    });
    return (
        <Container>
            <Lottie source={loadAnimation} autoPlay loop />
        </Container>
    );
};

export default Load;
