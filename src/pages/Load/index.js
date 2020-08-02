import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Alert} from 'react-native';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import {fetchMovies} from '../../store/modules/Movies/actions';

import loadAnimation from '../../assets/animations/load.json';
import Container from '../../components/Container';

import Years from '../../helpers/years';

const Load = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        async function loadInitialData() {
            try {
                const storedLanguages = await AsyncStorage.getItem('languages');
                const storedCountries = await AsyncStorage.getItem('countries');
                const storedGenres = await AsyncStorage.getItem('genres');
                const storedYears = await AsyncStorage.getItem('years');
                if (storedLanguages === null) {
                    const languages = await api.get('/languages/movies');
                    await AsyncStorage.setItem(
                        'languages',
                        JSON.stringify(languages.data)
                    );
                }
                if (!storedCountries) {
                    const countries = await api.get('/countries/movies');
                    await AsyncStorage.setItem(
                        'countries',
                        JSON.stringify(countries.data)
                    );
                }
                if (!storedGenres) {
                    const genres = await api.get('/genres/movies');
                    await AsyncStorage.setItem(
                        'genres',
                        JSON.stringify(genres.data)
                    );
                }
                if (!storedYears) {
                    await AsyncStorage.setItem(
                        'years',
                        JSON.stringify(Years.years)
                    );
                }
            } catch (e) {
                Alert.alert('Something went wrong, try again later');
            }

            const movies = await api.get('/movies/trending?page=1&limit=40');
            dispatch(fetchMovies(movies.data));
            navigation.navigate('HomeScreen');
        }
        loadInitialData();
    });
    return (
        <Container>
            <Lottie source={loadAnimation} autoPlay loop />
        </Container>
    );
};

export default Load;
