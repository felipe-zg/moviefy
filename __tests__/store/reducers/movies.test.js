import reducer, {INITIAL_STATE} from '~/store/modules/Movies/reducer';
import * as Movies from '~/store/modules/Movies/actions';

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

const newMovies = [
    {
        type: 'movie',
        score: 26.019499,
        movie: {
            title: 'Pirates of the caribbean',
            year: 2003,
            ids: {
                trakt: 12298,
                slug: 'pirates-of-the-caribbean-2003',
                imdb: 'tt1104003',
                tmdb: 20528
            }
        }
    },
    {
        type: 'movie',
        score: 29.648725,
        movie: {
            title: 'The avangers',
            year: 2015,
            ids: {
                trakt: 74286,
                slug: 'the-avangers-2015',
                imdb: 'tt1104006',
                tmdb: 19633
            }
        }
    }
];

describe('Movies reducer', () => {
    it('FETCH_MOVIES', () => {
        const state = reducer(INITIAL_STATE, Movies.fetchMovies(movies));
        expect(state).toStrictEqual(movies);
    });

    it('UPDATE_MOVIES', () => {
        const state = reducer(movies, Movies.updateMovies(newMovies));
        expect(state).toStrictEqual(newMovies);
    });
});
