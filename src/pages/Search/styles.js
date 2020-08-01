import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const Form = styled(Animated.View)`
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    margin: 10px;
    padding: 20px;
`;

export const Input = styled.TextInput`
    padding: 5px;
    background: #ddd;
    margin-top: 10px;
`;

export const Button = styled.TouchableOpacity`
    padding: 10px;
    background: #5ae4aa;
    border-radius: 20px;
    align-items: center;
    margin-top: 20px;
`;

export const ShowFormButton = styled.TouchableHighlight`
    padding: 5px;
    background: #5ae4aa;
    border-radius: 20px;
    align-items: center;
    margin: 20px 5px 0 0;
    width: 60px;
    align-self: flex-end;
`;
