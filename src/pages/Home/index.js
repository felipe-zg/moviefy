import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import api from '../../services/api';

import ScrollableContainer from '../../components/ScrollableContainer';
import Container from '../../components/Container';
import Show from '../../components/Show';
// import { Container } from './styles';

const Home = () => {
    const [trending, setTrendings] = useState(null);

    useEffect(() => {
        api.get('/movies/trending').then((response) => {
            setTrendings(response.data);
            console.log(response.data);
        });
    });

    const renderTrendings = () => {
        return trending.map((trending) => (
            <Show show={trending.movie} watchers={trending.watchers} />
        ));
    };
    return (
        <ScrollableContainer>
            {!trending && <Text>Carregando filmes</Text>}
            {trending && renderTrendings()}
        </ScrollableContainer>
    );
};
export default Home;
