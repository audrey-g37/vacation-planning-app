import { createContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// action - state management
import accountReducer from 'contexts/auth/accountReducer';
import { LOGIN, LOGOUT } from 'store/actions';

// project imports for auth
import auth0 from 'auth0-js';
import API from 'utils/API';

// const for state of dispatch
const initialState = {
	isLoggedIn: false,
	isInitialized: false,
	user: null
};

// const for context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(accountReducer, initialState);

	useEffect(() => {
		login();
	}, [dispatch]);

	const auth0Connection = new auth0.WebAuth({
		domain: process.env.REACT_APP_AUTH0_CLIENT_DOMAIN,
		clientID: process.env.REACT_APP_AUTH0_CLIENT_ID
	});

	const { user } = API;

	const [alert, setAlert] = useState({
		action: false,
		open: false,
		message: '',
		messages: [],
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'right'
		},
		variant: 'alert',
		alertSeverity: 'success',
		transition: 'SlideUp',
		close: false,
		actionButton: false,
		autoHideDuration: 6000
	});

	// const for using react-router-dom navigation
	const navigate = useNavigate();

	const authRegister = async (authObj) => {
		const { email, password, firstName, lastName } = authObj;
		const auth0CreateObj = {
			email: email,
			password: password,
			connection: 'Username-Password-Authentication',
			given_name: firstName,
			family_name: lastName
		};
		try {
			auth0Connection.signup(auth0CreateObj, async function (req, res) {
				await user.create({
					...authObj,
					authId: res.Id
				});
			});
		} catch (err) {
			console.error(err);
			setAlert({ ...alert, message: 'There was a problem creating the user.' });
		}
	};

	const login = async (authObj) => {
		if (!state.isLoggedIn) {
			try {
				const authLogin = auth0Connection.login(authObj);
				if (authLogin) {
					console.log({ authLogin });
					// user.getBySearch({authId: authLogin._id})
					dispatch({
						type: LOGIN,
						isLoggedIn: true
					});
				}
			} catch (err) {
				setAlert({
					...alert,
					open: true,
					alertSeverity: 'error',
					message: `There was a problem logging you in and gathering your user data.  Please try again later.`
				});
			}
		}
	};

	const getUserAndDispatch = async () => {
		try {
			if (!state?.isLoggedIn) {
				return login();
			}
		} catch (err) {
			setAlert({
				...alert,
				open: true,
				alertSeverity: 'error',
				message: `There was a problem automatically loading new notifications.  If the problem persists, contact your administrator.`
			});
		}
	};

	const logoutUser = async () => {
		dispatch({
			type: LOGOUT
		});
		navigate('/login');
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				login: () => {},
				authRegister,
				getUserAndDispatch,
				navigate,
				logoutUser,
				alert,
				setAlert
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node
};

export default AuthContext;
