import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
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
            await fetchFilters('languages');
            await fetchFilters('countries');
            await fetchFilters('genres');
            await saveYears();
            const movies = await api.get('/movies/trending?page=1&limit=40');
            dispatch(fetchMovies(movies.data));
            navigation.navigate('HomeScreen');
        }
        loadInitialData();
    });

    const fetchFilters = async (storageKey) => {
        try {
            const storedValue = await AsyncStorage.getItem(storageKey);
            if (storedValue === null) {
                const values = await api.get(`/${storageKey}/movies`);
                await AsyncStorage.setItem(
                    storageKey,
                    JSON.stringify(values.data)
                );
            }
        } catch (e) {
            Alert.alert('Something went wrong, try again later');
        }
    };

    const saveYears = async () => {
        try {
            const storedYears = await AsyncStorage.getItem('years');
            if (!storedYears) {
                await AsyncStorage.setItem(
                    'years',
                    JSON.stringify(Years.years)
                );
            }
        } catch (e) {
            Alert.alert('Something went wrong, try again later');
        }
    };

    return (
        <Container>
            <Lottie source={loadAnimation} autoPlay loop />
        </Container>
    );
};

export default Load;
