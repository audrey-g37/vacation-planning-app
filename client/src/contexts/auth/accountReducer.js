// action - state management
import { LOGIN, LOGOUT } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const accountReducer = (state, action) => {
	const { user, authInfo, type } = action;
	switch (type) {
		case LOGIN: {
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
