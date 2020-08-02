import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import IOIcon from 'react-native-vector-icons/Ionicons';

import Container from '../../components/Container';
import {Close} from './styles';

const WebSite = ({route}) => {
    const {homepage} = route.params;
    const navigation = useNavigation();
    return (
        <Container>
            <Close onPress={() => navigation.goBack()}>
                <IOIcon name="close" color="#fff" size={25} />
            </Close>
            <WebView source={{uri: homepage}} />
        </Container>
    );
};

export default WebSite;
