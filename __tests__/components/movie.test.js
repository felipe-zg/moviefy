import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {useEffect} from 'react';
import Movie from '~/components/Movie';
import MockedNavigator from '../../__mocks__/MockedNavigator';

const MOVIE = {
    title: 'TRON: legacy',
    year: '2010',
    ids: {
        imdb: '764837',
        trakt: '1'
    }
};

jest.mock('useEfect');

describe('<Movie/>', () => {
    it('should render movie information', () => {
        const {getByTestId} = render(
            <MockedNavigator component={Movie} params={{movie: MOVIE}} />
        );
        const movieTitle = getByTestId('movie-title');
        const movieYear = getByTestId('movie-year');
        // expect(movieTitle).toBe(MOVIE.title);
        // expect(movieYear).toBe(MOVIE.year);
    });
});
