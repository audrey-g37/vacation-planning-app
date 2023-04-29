// action - state management
import { LOGIN, LOGOUT } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const accountReducer = (state, action) => {
	const { user, authInfo } = action;
	switch (action.type) {
		case LOGIN: {
			console.log({ user, authInfo, action });
			state = {
				...state,
				isLoggedIn: true,
				isInitialized: true,
				user: user,
				authInfo: authInfo
			};

			return { ...state };
		}
		case LOGOUT: {
			return {
				isInitialized: true,
				isLoggedIn: false,
				token: null
			};
		}
		default: {
			return { ...state };
		}
	}
};

export default accountReducer;
