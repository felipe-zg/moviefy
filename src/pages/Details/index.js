import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import api from '../../services/api';

import poster from '../../assets/images/poster.jpg';
import ScrollableContainer from '../../components/ScrollableContainer';
import {Poster} from './styles';

const Details = ({route}) => {
    const {show} = route.params;
    const [summary, setSummary] = useState(null);
    const [people, setPeople] = useState(null);

    useEffect(() => {
        api.get(`/movies/${show.ids.trakt}?extended=full`).then((response) => {
            setSummary(response.data);
        });
        api.get(`/movies/${show.ids.trakt}/people`).then((response) => {
            setPeople(response.data);
        });
    });
    return (
        <ScrollableContainer>
            {!summary && <Text>Carregando</Text>}
            {summary && (
                <>
                    <View>
                        <Poster souce={poster} />
                    </View>
                    <Text>Detalhes do filme</Text>
                    <Text>{summary.title}</Text>
                    <Text>{summary.tagline}</Text>
                    <Text>{summary.overview}</Text>
                </>
            )}
            {people &&
                people.cast.map((person) => <Text>{person.person.name}</Text>)}
        </ScrollableContainer>
    );
};
export default Details;
