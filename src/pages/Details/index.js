import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Linking, Alert} from 'react-native';
import ADIcon from 'react-native-vector-icons/AntDesign';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import IOIcon from 'react-native-vector-icons/Ionicons';
import Lottie from 'lottie-react-native';

import loadAnimation from '../../assets/animations/load.json';

import api from '../../services/api';

import Container from '../../components/Container';
import ScrollableContainer from '../../components/ScrollableContainer';
import Text from '../../components/Text';
import {
    Poster,
    PosterView,
    Genre,
    InfoRow,
    InfoItem,
    Info,
    Link,
    Person,
    PersonInfo,
    IconView
} from './styles';

const Details = ({route}) => {
    const {movie, photo} = route.params;
    const [summary, setSummary] = useState(null);
    const [people, setPeople] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        api.get(`/movies/${movie.ids.trakt}?extended=full`).then((response) => {
            setSummary(response.data);
        });
        api.get(`/movies/${movie.ids.trakt}/people`).then((response) => {
            setPeople(response.data);
        });
    });

    const openUrl = useCallback(async (url) => {
        const supported = await Linking.canOpenURL(url);
        supported
            ? await Linking.openURL(url)
            : Alert.alert(`Don't know how to open this URL: ${url}`);
    }, []);

    const renderCast = () => {
        return people.cast.map((person, index) => {
            if (index < 5) {
                return (
                    <Person key={index}>
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

    if (!summary || !people) {
        return (
            <Container>
                <Lottie source={loadAnimation} autoPlay loop />
            </Container>
        );
    }
    return (
        <ScrollableContainer>
            {summary && (
                <>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <IOIcon name="ios-arrow-undo" color="#fff" size={35} />
                    </TouchableOpacity>
                    <PosterView>
                        <Poster source={{uri: photo}} />
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
                    <InfoRow background="#004565">
                        {summary.genres.map((genrer, index) => (
                            <Genre key={index}>
                                <Text>{genrer}</Text>
                            </Genre>
                        ))}
                    </InfoRow>
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
            {summary.homepage && (
                <Link onPress={() => openUrl(summary.homepage)}>
                    <Text>Go to website</Text>
                </Link>
            )}
        </ScrollableContainer>
    );
};
export default Details;
