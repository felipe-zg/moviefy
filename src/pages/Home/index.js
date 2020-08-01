import React, {useRef, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
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

const LANGUAGES = [
    {
        name: 'blank',
        code: null
    },
    {
        name: 'English',
        code: 'en'
    },
    {
        name: 'Italian',
        code: 'it'
    },
    {
        name: 'Polish',
        code: 'pl'
    }
];

const GENRES = [
    {
        name: 'blank',
        slug: null
    },
    {
        name: 'Action',
        slug: 'action'
    },
    {
        name: 'Adventure',
        slug: 'adventure'
    },
    {
        name: 'Animation',
        slug: 'animation'
    },
    {
        name: 'Anime',
        slug: 'anime'
    },
    {
        name: 'Comedy',
        slug: 'comedy'
    },
    {
        name: 'Crime',
        slug: 'crime'
    },
    {
        name: 'Disaster',
        slug: 'disaster'
    },
    {
        name: 'Documentary',
        slug: 'documentary'
    },
    {
        name: 'Drama',
        slug: 'drama'
    },
    {
        name: 'Eastern',
        slug: 'eastern'
    },
    {
        name: 'Family',
        slug: 'family'
    },
    {
        name: 'Fan Film',
        slug: 'fan-film'
    },
    {
        name: 'Fantasy',
        slug: 'fantasy'
    },
    {
        name: 'Film Noir',
        slug: 'film-noir'
    },
    {
        name: 'History',
        slug: 'history'
    },
    {
        name: 'Holiday',
        slug: 'holiday'
    },
    {
        name: 'Horror',
        slug: 'horror'
    },
    {
        name: 'Indie',
        slug: 'indie'
    },
    {
        name: 'Music',
        slug: 'music'
    },
    {
        name: 'Musical',
        slug: 'musical'
    },
    {
        name: 'Mystery',
        slug: 'mystery'
    },
    {
        name: 'None',
        slug: 'none'
    },
    {
        name: 'Road',
        slug: 'road'
    },
    {
        name: 'Romance',
        slug: 'romance'
    },
    {
        name: 'Science Fiction',
        slug: 'science-fiction'
    },
    {
        name: 'Short',
        slug: 'short'
    },
    {
        name: 'Sports',
        slug: 'sports'
    },
    {
        name: 'Sporting Event',
        slug: 'sporting-event'
    },
    {
        name: 'Suspense',
        slug: 'suspense'
    },
    {
        name: 'Thriller',
        slug: 'thriller'
    },
    {
        name: 'Tv Movie',
        slug: 'tv-movie'
    },
    {
        name: 'War',
        slug: 'war'
    },
    {
        name: 'Western',
        slug: 'western'
    }
];

const COUNTRIES = [
    {
        name: 'blank',
        code: null
    },
    {
        name: 'Australia',
        code: 'au'
    },
    {
        name: 'Japan',
        code: 'ja'
    },
    {
        name: 'United States',
        code: 'us'
    }
];

const YEARS = [
    {
        name: 'blank',
        code: null
    },
    {
        name: '2022',
        code: '2022'
    },
    {
        name: '2021',
        code: '2021'
    },
    {
        name: '2020',
        code: '2020'
    },
    {
        name: '2019',
        code: '2019'
    },
    {
        name: '2018',
        code: '2018'
    }
];

const Home = () => {
    const movies = useSelector((state) => state.Movies);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [query, setQuery] = useState('');
    const [language, setLanguage] = useState('en');
    const [country, setCountry] = useState('us');
    const [genrer, setGenrer] = useState('action');
    const [year, setYear] = useState('2020');

    const formPosition = useRef(new Animated.ValueXY({x: 0, y: -SCREEN_HEIGHT}))
        .current;
    const moviesListPosition = useRef(new Animated.ValueXY({x: 0, y: 0}))
        .current;

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const getQuery = () => {
        let requestPath = `/search/movie?query=${query}`;
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

    const renderItems = (ITEMS) => {
        return ITEMS.map((item) => {
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
                            {renderItems(GENRES)}
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
                            {renderItems(LANGUAGES)}
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
                            {renderItems(COUNTRIES)}
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
                            {renderItems(YEARS)}
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
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('DetailsScreen', {
                                        show: item.movie
                                    })
                                }>
                                <Movie
                                    show={item.movie}
                                    watchers={
                                        item.watchers ? item.watchers : null
                                    }
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => String(item.movie.ids.trakt)}
                    />
                </>
            )}
        </Container>
    );
};
export default Home;
