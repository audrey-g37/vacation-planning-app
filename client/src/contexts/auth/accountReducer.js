// action - state management
import { LOGIN, LOGOUT } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const accountReducer = (state, action) => {
	const { payload } = action;
	console.log({ payload });
	switch (action.type) {
		case LOGIN: {
			// const {} = action.payload;
			state = {
				...state,
				isLoggedIn: true,
				isInitialized: true
			};

			return { ...state };
		}
		case LOGOUT: {
			return {
				isInitialized: true,
				isLoggedIn: false
			};
		}
		default: {
			return { ...state };
		}
	}
};

export default accountReducer;
