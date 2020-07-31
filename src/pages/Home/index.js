import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

import api from '../../services/api';

import Container from '../../components/Container';
import Show from '../../components/Show';
import {Header, MovieList} from './styles';

const Home = () => {
    const [trendings, setTrendings] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        api.get('/movies/trending').then((response) => {
            console.log(response.data);
            setTrendings(response.data);
        });
    });
    return (
        <Container>
            {!trendings && <Text>Carregando filmes</Text>}
            {trendings && (
                <>
                    <Header>
                        <Text style={{color: '#fff', fontSize: 26}}>
                            Top filmes
                        </Text>
                        <TouchableOpacity onPress={() => console.warn('more')}>
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
