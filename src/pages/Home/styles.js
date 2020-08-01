import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    margin-bottom: 5px;
`;

export const Form = styled(Animated.View)`
    background: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    margin: 10px;
    padding: 20px;
`;

export const Input = styled.View`
    background: #ddd;
    margin: 5px 0 10px 0;
    border-radius: 10px;
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
