import {produce} from 'immer';

export const INITIAL_STATE = [];
const FETCH_TYPE = '@Treding/FETCH_TRENDINGS';

export default function TrendingReducer(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case `${FETCH_TYPE}`: {
                action.trendings.map((trending) => {
                    draft.push(trending);
                });
                break;
            }
            case `${FETCH_TYPE}_PENDING`:
                break;

            case `${FETCH_TYPE}_FULFILLED`:
                action.trendings.map((trending) => {
                    draft.push(trending);
                });
                break;

            case `${FETCH_TYPE}_REJECTED`:
                break;
            default: {
                break;
            }
        }
    });
}
