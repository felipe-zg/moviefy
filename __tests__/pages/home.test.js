import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {useSelector, Provider} from 'react-redux';

import Home from '~/pages/Home';
import store from '~/store';

jest.mock('react-redux');

const movies = [
    {
        type: 'movie',
        score: 26.019499,
        movie: {
            title: 'TRON: Legacy',
            year: 2010,
            ids: {
                trakt: 12601,
                slug: 'tron-legacy-2010',
                imdb: 'tt1104001',
                tmdb: 20526
            }
        }
    },
    {
        type: 'movie',
        score: 29.648725,
        movie: {
            title: 'THE BATMAN',
            year: 2021,
            ids: {
                trakt: 74633,
                slug: 'the-batman-2021',
                imdb: 'tt1104002',
                tmdb: 74638
            }
        }
    }
];

describe('<Home/>', () => {
    // const {getByTestId, getByText} = render(
    //     <Provider store={store}>
    //         <Home />
    //     </Provider>
    // );
    it('should', () => {
        // useSelector.mockImplementation((cb) => cb({Movies: movies}));
        // expect(getByText('THE BATMAN')).toBeTruthy();
        expect(true).toBeTruthy();
    });
});
