import React from 'react';
import {View} from 'react-native';

import Container from '../../components/Container';
import Text from '../../components/Text';
import {Form, Input} from './styles';

const Search = () => {
    return (
        <Container>
            <Form>
                <Input />
                <Input />
                <Input />
                <Input />
            </Form>
        </Container>
    );
};

export default Search;
