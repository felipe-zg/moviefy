import {produce} from 'immer';
import Show from '../../../components/Show';

export const INITIAL_STATE = [];

export default function ShowReducer(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@Show/START_SHOW_LIST': {
                action.shows.map((show) => {
                    draft.push(Show);
                });
                break;
            }
            default: {
                return state;
            }
        }
    });
}
