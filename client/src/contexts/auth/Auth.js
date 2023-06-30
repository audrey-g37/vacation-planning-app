import { createContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLazyQuery, useMutation } from '@apollo/client';

// action - state management
import accountReducer from 'contexts/auth/accountReducer';
import { LOGIN, LOGOUT } from 'contexts/auth/actions';

// project imports

// for auth
import auth0 from 'auth0-js';
// for apollo
import {
	QUERY_BUDGET,
	QUERY_BUDGETS,
	QUERY_TASK,
	QUERY_TASKS,
	QUERY_TRIP,
	QUERY_TRIPS,
	QUERY_USER,
	QUERY_USERS
} from 'utils/apollo/queries';
import {
	ADD_BUDGET,
	ADD_TASK,
	ADD_TRIP,
	ADD_USER,
	REMOVE_BUDGET,
	REMOVE_TASK,
	REMOVE_TRIP,
	UPDATE_BUDGET,
	UPDATE_TASK,
	UPDATE_TRIP,
	UPDATE_USER
} from 'utils/apollo/mutations';

// const for state of dispatch
const initialState = {
	isLoggedIn: false,
	isInitialized: false,
	user: null
};

// const for context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	// all data stored on auth context
	const [state, dispatch] = useReducer(accountReducer, initialState);
	useEffect(() => {
		login();
	}, [dispatch]);

	const authSessionInfo = JSON.parse(window.sessionStorage.getItem('authInfo'));
	const userSessionInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));

	const login = () => {
		if (!authSessionInfo) {
			applyAuthToken()
				.then((res) => {
					if (!res.success) {
						dispatch({ type: LOGOUT });
						navigate('/login');
					}
				})
				.catch((err) => {
					console.error(err);
					dispatch({ type: LOGOUT });
					navigate('/login');
				});
		}
		if (!state.user || !state.auhInfo) {
			dispatch({
				type: LOGIN,
				user: userSessionInfo,
				authInfo: authSessionInfo
			});
		}
	};

	// alerts that are displayed throughout app
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

	// using react-router-dom navigation
	const navigate = useNavigate();

	// apollo queries
	const queryTypes = {
		// single result
		user: QUERY_USER,
		trip: QUERY_TRIP,
		task: QUERY_TASK,
		budget: QUERY_BUDGET,
		// multiple results
		users: QUERY_USERS,
		trips: QUERY_TRIPS,
		tasks: QUERY_TASKS,
		budgets: QUERY_BUDGETS
	};

	// apollo mutations
	const mutationTypes = {
		// create
		addUser: ADD_USER,
		addTrip: ADD_TRIP,
		addTask: ADD_TASK,
		addBudget: ADD_BUDGET,
		// update
		updateUser: UPDATE_USER,
		updateTrip: UPDATE_TRIP,
		updateTask: UPDATE_TASK,
		updateBudget: UPDATE_BUDGET,
		// delete
		removeTrip: REMOVE_TRIP,
		removeTask: REMOVE_TASK,
		removeBudget: REMOVE_BUDGET
	};

	const [getUser] = useLazyQuery(queryTypes['user']);
	const [addUser] = useMutation(mutationTypes['addUser']);

	const auth0ConnectionObj = {
		domain: process.env.REACT_APP_AUTH0_CLIENT_DOMAIN,
		clientID: process.env.REACT_APP_AUTH0_CLIENT_ID
	};
	// connection to Auth0 for auth functions
	const auth0Connection = new auth0.WebAuth(auth0ConnectionObj);

	let auth0AuthObj = {
		realm: 'Grip',
		scope: 'openid',
		responseType: 'token id_token',
		redirectUri: `${
			process.env.NODE_ENV === 'development' ? 'http://localhost:3000/dashboard' : ''
		}`
	};

	// registering a new user
	const register = async (authObj) => {
		let userData;

		const { email, password, firstName, lastName } = authObj;

		const auth0CreateObj = {
			email: email,
			password: password,
			connection: 'Grip',
			given_name: firstName,
			family_name: lastName
		};

		try {
			auth0Connection.signup(auth0CreateObj, async function (req, res) {
				if (res) {
					const { data } = await addUser({
						variables: {
							...authObj,
							authId: res.Id
						}
					});
					userData = data.addUser;
				}
			});
		} catch (err) {
			console.error(err);
		}
		userData
			? setAlert({
					...alert,
					alertSeverity: 'success',
					message: 'User successfully created!'
			  })
			: setAlert({
					...alert,
					alertSeverity: 'error',
					message: 'There was a problem creating the user.'
			  });
	};

	// using accessToken to get user info and replacing the token in the url
	const applyAuthToken = async () => {
		let responseObj = {
			success: false
		};
		try {
			const existingToken = authSessionInfo?.accessToken;
			const accessToken = window.location.hash;
			const isLoggedIn = state.isLoggedIn;

			let dispatchObj = {
				type: LOGIN,
				isLoggedIn: true
			};
			const runDispatch = (dispatchInfo) => {
				window.sessionStorage.setItem('authInfo', JSON.stringify(dispatchInfo.authInfo));
				window.sessionStorage.setItem('userInfo', JSON.stringify(dispatchInfo.user));
				dispatch({ ...dispatchInfo });
			};
			if (!existingToken && !isLoggedIn && !accessToken) {
				setAlert({ message: 'You need to be logged in to see this page.' });
				return responseObj;
			}
			if (existingToken) {
				return { ...responseObj, success: true };
			}
			if (accessToken) {
				if (!isLoggedIn) {
					auth0Connection.parseHash(async (err, authResult) => {
						if (err) {
							return { ...responseObj, success: false };
						}
						const authId = authResult.idTokenPayload.sub.split('|')[1];
						const { data } = await getUser({ variables: { authId: authId } });
						runDispatch({
							...dispatchObj,
							user: data.user,
							authInfo: authResult
						});
					});
				}
			} else {
				auth0Connection.authorize(
					{ ...auth0AuthObj, state: state.authInfo.state },
					(err, authResult) => {
						if (err) {
							return { ...responseObj, success: false };
						}
						runDispatch({
							...dispatchObj,
							authInfo: authResult
						});
					}
				);
			}
			return { ...responseObj, success: true };
		} catch (err) {
			console.error(err);
		}
	};

	// authorizing an existing user based on email and password
	const getAuthToken = async (authObj = {}) => {
		try {
			const authToSend = { ...auth0AuthObj, ...authObj };
			auth0Connection.login(authToSend, async (err) => {
				if (err) {
					return console.error({ err });
				}
			});
		} catch (err) {
			console.error({ err });
			setAlert({
				...alert,
				open: true,
				alertSeverity: 'error',
				message: `There was a problem logging you in and gathering your user data.  Please try again later.`
			});
		}
	};

	const logoutUser = async () => {
		auth0Connection.logout();
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
				alert,
				setAlert,
				navigate,
				getAuthToken,
				applyAuthToken,
				register,
				logoutUser
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
