import styled from 'styled-components/native';

export const PosterView = styled.View`
    width: 100%;
    align-items: center;
    margin-top: -35px;
`;
export const Poster = styled.Image`
    height: 300px;
    width: 200px;
`;

export const GenresRow = styled.View`
    flex-direction: row;
    background: #004565;
    padding: 10px;
`;

export const Genre = styled.View`
    padding: 5px 10px;
    margin: 0 10px;
    border-radius: 10px;
    background: #1d334a;
`;

export const InfoRow = styled.View`
    flex-direction: row;
    padding: 10px;
    justify-content: space-around;
    background: ${(props) => props.background || '#1d334a'};
`;

export const InfoItem = styled.View`
    flex-direction: row;
    padding: 5px 10px;
    border-radius: 10px;
    background: #191919;
`;

export const Info = styled.View`
    padding: 10px;
    background: ${(props) => props.background};
`;

export const Person = styled.View`
    flex-direction: row;
    padding: 10px;
    border: 0px solid rgba(255, 255, 255, 0.5);
    border-bottom-width: 1px;
`;

export const PersonInfo = styled.View`
    margin: 10px;
`;

export const Link = styled.TouchableOpacity`
    align-self: center;
    padding: 15px;
    margin: 20px 0 10px 0;
    background: #5ae4aa;
    border-radius: 10px;
`;

export const IconView = styled.View`
    margin-right: 10px;
`;
