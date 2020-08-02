import React, {useRef, useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {
    Animated,
    Dimensions,
    TouchableOpacity,
    Picker,
    TextInput
} from 'react-native';
import Lottie from 'lottie-react-native';

import emptyAnimation from '../../assets/animations/empty.json';

import api from '../../services/api';
import {updateMovies} from '../../store/modules/Movies/actions';

import Container from '../../components/Container';
import MovieList from '../../components/MovieList';
import Movie from '../../components/Movie';
import Text from '../../components/Text';
import {Header, Form, Input, Button, ShowFormButton} from './styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Home = () => {
    const movies = useSelector((state) => state.Movies);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [query, setQuery] = useState('');
    const [language, setLanguage] = useState('');
    const [country, setCountry] = useState('');
    const [genrer, setGenrer] = useState('');
    const [year, setYear] = useState('');

    const [languages, setLanguages] = useState([{name: 'blank', code: ''}]);
    const [countries, setCountries] = useState([{name: 'blank', code: ''}]);
    const [genres, setGenres] = useState([{name: 'blank', slug: ''}]);
    const [years, setYears] = useState([{name: 'blank', code: ''}]);

    const [shouldgetFilters, setShouldGetFilters] = useState(true);

    const formPosition = useRef(new Animated.ValueXY({x: 0, y: -SCREEN_HEIGHT}))
        .current;
    const moviesListPosition = useRef(new Animated.ValueXY({x: 0, y: 0}))
        .current;

    const dispatch = useDispatch();

    useEffect(() => {
        if (shouldgetFilters) {
            getFilters();
        }
    });

    const getFilters = () => {
        setShouldGetFilters(false);
        getFilter('languages', setLanguages);
        getFilter('countries', setCountries);
        getFilter('genres', setGenres);
        getFilter('years', setYears);
    };

    const getFilter = async (filterKey, setFilter) => {
        const storedFilter = await AsyncStorage.getItem(filterKey);
        const returnFilter = JSON.parse(storedFilter);
        setFilter(returnFilter);
    };

    const getQuery = () => {
        let requestPath = `/search/movie?page=1&limit=40&query=${query}`;
        requestPath += year ? `&years=${year}` : '';
        requestPath += country ? `&countries=${country}` : '';
        requestPath += language ? `&languages=${language}` : '';
        requestPath += genrer ? `&genres=${genrer}` : '';

        return requestPath;
    };

    const filterMovies = async () => {
        hideFilters();
        const response = await api.get(getQuery());
        dispatch(updateMovies(response.data));
    };

    const animateElement = (element, x, y, callback) => {
        Animated.timing(element, {
            toValue: {x, y},
            duration: 1000,
            useNativeDriver: false
        }).start(() => callback());
    };

    const showFilters = () => {
        animateElement(moviesListPosition, -SCREEN_WIDTH, 0, () => {
            setIsFormVisible(true);
            animateElement(formPosition, 0, 0, () => {});
        });
    };

    const hideFilters = () => {
        animateElement(formPosition, 0, -SCREEN_HEIGHT, () => {
            setIsFormVisible(false);
            animateElement(moviesListPosition, 0, 0, () => {});
        });
    };

    const renderItems = (items) => {
        return items.map((item) => {
            return (
                <Picker.Item
                    label={item.name}
                    value={item.code ? item.code : item.slug}
                    key={item.code ? item.code : item.slug ? item.slug : 0}
                />
            );
        });
    };

    const showForm = () => {
        if (isFormVisible) {
            return (
                <Form style={formPosition.getLayout()}>
                    <Text color="#1d334a" weight="bold">
                        Search text:
                    </Text>
                    <Input>
                        <TextInput
                            placeholder="title, overview, tagline..."
                            value={query}
                            onChangeText={setQuery}
                        />
                    </Input>
                    <Text color="#1d334a" weight="bold">
                        Genrer:
                    </Text>
                    <Input>
                        <Picker
                            selectedValue={genrer}
                            style={{height: 50, width: '100%'}}
                            onValueChange={(itemValue, itemIndex) =>
                                setGenrer(itemValue)
                            }>
                            <Picker.Item label="blank" value="" key="0" />
                            {renderItems(genres)}
                        </Picker>
                    </Input>
                    <Text color="#1d334a" weight="bold">
                        Language:
                    </Text>
                    <Input>
                        <Picker
                            selectedValue={language}
                            style={{height: 50, width: '100%'}}
                            onValueChange={(itemValue, itemIndex) =>
                                setLanguage(itemValue)
                            }>
                            <Picker.Item label="blank" value="" key="0" />
                            {renderItems(languages)}
                        </Picker>
                    </Input>
                    <Text color="#1d334a" weight="bold">
                        COuntry:
                    </Text>
                    <Input>
                        <Picker
                            selectedValue={country}
                            style={{height: 50, width: '100%'}}
                            onValueChange={(itemValue, itemIndex) =>
                                setCountry(itemValue)
                            }>
                            <Picker.Item label="blank" value="" key="0" />
                            {renderItems(countries)}
                        </Picker>
                    </Input>
                    <Text color="#1d334a" weight="bold">
                        Year:
                    </Text>
                    <Input>
                        <Picker
                            selectedValue={year}
                            style={{height: 50, width: '100%'}}
                            onValueChange={(itemValue, itemIndex) =>
                                setYear(itemValue)
                            }>
                            <Picker.Item label="blank" value="" key="0" />
                            {renderItems(years)}
                        </Picker>
                    </Input>
                    <Button onPress={filterMovies}>
                        <Text>Search</Text>
                    </Button>
                </Form>
            );
        }
    };

    if (movies.length === 0) {
        return (
            <Container>
                <Lottie source={emptyAnimation} autoPlay loop />
            </Container>
        );
    }

    return (
        <Container>
            {!movies && <Text>Carregando filmes</Text>}
            {movies && (
                <>
                    <Header>
                        <Text size="20px" weight="bold">
                            Top movies
                        </Text>
                        <ShowFormButton
                            onPress={isFormVisible ? hideFilters : showFilters}>
                            <Text size="8px">
                                {isFormVisible ? 'close' : 'Filters'}
                            </Text>
                        </ShowFormButton>
                    </Header>
                    {showForm()}
                    <MovieList
                        style={moviesListPosition.getLayout()}
                        data={movies}
                        renderItem={({item}) => (
                            <Movie
                                show={item.movie}
                                watchers={item.watchers ? item.watchers : null}
                            />
                        )}
                        keyExtractor={(item) => String(item.movie.ids.trakt)}
                    />
                </>
            )}
        </Container>
    );
};
export default Home;
