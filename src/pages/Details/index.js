import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ADIcon from 'react-native-vector-icons/AntDesign';
import MDIcon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import poster from '../../assets/images/poster.jpg';
import ScrollableContainer from '../../components/ScrollableContainer';
import Text from '../../components/Text';
import {
    Poster,
    PosterView,
    GenresRow,
    Genre,
    InfoRow,
    InfoItem,
    Info,
    Link,
    Person,
    PersonPhoto,
    PersonInfo,
    IconView
} from './styles';

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

    const renderCast = () => {
        return people.cast.map((person, index) => {
            if (index < 5) {
                return (
                    <Person key={index}>
                        <PersonPhoto />
                        <PersonInfo>
                            <Text size="14px" weight="bold">
                                Actor/Actress:
                            </Text>
                            <Text>{person.person.name}</Text>
                            <Text size="14px" weight="bold">
                                Character(s):
                            </Text>
                            {person.characters.map((character, index) => (
                                <Text key={index}>{character}</Text>
                            ))}
                        </PersonInfo>
                    </Person>
                );
            }
        });
    };

    return (
        <ScrollableContainer>
            {!summary && <Text>Carregando</Text>}
            {summary && (
                <>
                    <PosterView>
                        <Poster source={poster} />
                    </PosterView>
                    <InfoRow>
                        <InfoItem>
                            <IconView>
                                <ADIcon
                                    name="calendar"
                                    size={25}
                                    color="#fff"
                                />
                            </IconView>
                            <Text>{summary.year}</Text>
                        </InfoItem>
                        <InfoItem>
                            <IconView>
                                <MDIcon name="star" size={25} color="#ff0" />
                            </IconView>
                            <Text>{Number(summary.rating).toFixed(2)}</Text>
                        </InfoItem>
                        <InfoItem>
                            <IconView>
                                <MDIcon
                                    name="access-time"
                                    size={25}
                                    color="#fff"
                                />
                            </IconView>
                            <Text>{summary.runtime} min</Text>
                        </InfoItem>
                    </InfoRow>
                    <Info background="#1d334a">
                        <Text size="16px" weight="bold">
                            {summary.title}
                        </Text>
                        <Text size="14px">{summary.tagline}</Text>
                    </Info>
                    <GenresRow>
                        {summary.genres.map((genrer, index) => (
                            <Genre key={index}>
                                <Text>{genrer}</Text>
                            </Genre>
                        ))}
                    </GenresRow>
                    <Info background="#084d6e">
                        <Text size="14px" weight="bold">
                            Overview
                        </Text>
                        <Text>{summary.overview}</Text>
                    </Info>
                </>
            )}
            <Info background="#1d334a">
                <Text size="16px" weight="bold">
                    Cast
                </Text>
            </Info>
            {people && renderCast()}
            <Link onPress={() => console.warn('abrindo site')}>
                <Text>Go to website</Text>
            </Link>
        </ScrollableContainer>
    );
};
export default Details;
