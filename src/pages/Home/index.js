import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import api from '../../services/api';
import {fetchTrendings} from '../../store/modules/Trending/actions';

import Container from '../../components/Container';
import Show from '../../components/Show';
import Text from '../../components/Text';
import {Header, MovieList} from './styles';

const Home = () => {
    const [trendings, setTrendings] = useState(null);
    // const trendings = useSelector((state) => state.Trending);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        api.get('/movies/trending').then((response) => {
            setTrendings(response.data);
        });
    });
    return (
        <Container>
            {!trendings && <Text>Carregando filmes</Text>}
            {trendings && (
                <>
                    <Header>
                        <Text size="20px" weight="bold">
                            Top movies
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SearchScreen')}>
                            <Icon name="pluscircleo" color="#fff" size={40} />
                        </TouchableOpacity>
                    </Header>
                    <MovieList
                        data={trendings}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('DetailsScreen', {
                                        show: item.movie
                                    })
                                }>
                                <Show
                                    show={item.movie}
                                    watchers={item.watchers}
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
