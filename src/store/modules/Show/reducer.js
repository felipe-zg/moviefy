import {produce} from 'immer';

export const INITIAL_STATE = [];

export default function ShowReducer(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@Show/FETCH_SHOWS': {
                action.shows.map((show) => {
                    draft.push(show);
                });
                break;
            }
            default: {
                return state;
            }
        }
    });
}
