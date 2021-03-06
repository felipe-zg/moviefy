import styled from 'styled-components/native';

export const MovieRow = styled.View`
    flex-direction: row;
    border-radius: 10px;
    margin: 5px 10px;
    overflow: hidden;
    background: #084d6e;
`;

export const Photo = styled.Image`
    height: 150px;
    width: 100px;
`;

export const Info = styled.View`
    padding: 10px;
    width: 70%;
`;

export const NumberOfViewers = styled.View`
    flex-direction: row;
    align-items: center;
`;
