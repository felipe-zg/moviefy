import React, {useRef, useEffect, useState} from 'react';
import {Animated, Dimensions} from 'react-native';

import Container from '../../components/Container';
import Text from '../../components/Text';
import {Form, Input, Button, ShowFormButton} from './styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const Search = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const formPosition = useRef(new Animated.ValueXY({x: 0, y: -SCREEN_HEIGHT}))
        .current;

    const moveForm = (x, y) => {
        Animated.timing(formPosition, {
            toValue: {x, y},
            duration: 2000,
            useNativeDriver: false
        }).start();
    };

    const showFilters = () => {
        moveForm(0, 0);
        setIsFormVisible(true);
    };

    const hideFilters = () => {
        moveForm(0, -SCREEN_HEIGHT);
        setIsFormVisible(false);
    };

    return (
        <Container>
            <ShowFormButton onPress={isFormVisible ? hideFilters : showFilters}>
                <Text size="8px">{isFormVisible ? 'close' : 'Filters'}</Text>
            </ShowFormButton>
            <Form style={formPosition.getLayout()}>
                <Input />
                <Input />
                <Input />
                <Input />
                <Button onPress={hideFilters}>
                    <Text>Search</Text>
                </Button>
            </Form>
        </Container>
    );
};

export default Search;
