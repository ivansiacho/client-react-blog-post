import { FETCH_POSTS, FETCH_POST } from '../actions/index';

let INITIAL_STATE = { list: [], post: null };

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_POSTS:
			return { ...state,
				list: action.payload.data
			}
		case FETCH_POST:
			return { ...state,
				post: action.payload.data
			}
		default:
			return state;
	}
}