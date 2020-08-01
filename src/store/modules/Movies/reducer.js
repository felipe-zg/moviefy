import {produce} from 'immer';

export const INITIAL_STATE = [];

export default function MoviesReducer(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@Movies/FETCH_MOVIES': {
                action.movies.map((movie) => {
                    draft.push(movie);
                });
                break;
            }
            case '@Movies/UPDATE_MOVIES': {
                draft.splice(0, draft.length);
                action.movies.map((movie) => {
                    draft.push(movie);
                });
                break;
            }
            default: {
                return state;
            }
        }
    });
}
