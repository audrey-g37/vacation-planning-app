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
	QUERY_USERS,
	QUERY_FRIEND_REQUESTS,
	QUERY_FRIEND_REQUESTS_MATCH,
	QUERY_TRIP_ATTENDEES,
	QUERY_TRIP_ATTENDEES_BY_TRIP_ID,
	QUERY_TRIP_ATTENDEES_BY_ATTENDEE_ID
} from 'utils/apollo/queries';
import {
	ADD_BUDGET,
	ADD_TASK,
	ADD_TRIP,
	ADD_USER,
	ADD_FRIEND_REQUEST,
	ADD_TRIP_ATTENDEE,
	REMOVE_BUDGET,
	REMOVE_TASK,
	REMOVE_TRIP,
	UPDATE_BUDGET,
	UPDATE_TASK,
	UPDATE_TRIP,
	UPDATE_USER,
	UPDATE_FRIEND_REQUEST,
	UPDATE_TRIP_ATTENDEE
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

	// AUTH 0
	const auth0ConnectionObj = {
		domain: process.env.REACT_APP_AUTH0_CLIENT_DOMAIN,
		clientID: process.env.REACT_APP_AUTH0_CLIENT_ID
	};

	let auth0AuthObj = {
		...auth0ConnectionObj,
		realm: 'Grip',
		scope: 'openid',
		responseType: 'token id_token',
		redirectUri: `${
			process.env.NODE_ENV === 'development'
				? 'http://localhost:3000'
				: 'http://grip.webappsbyaudreyapi.dev'
		}/dashboard`
	};

	// connection to Auth0 for auth functions
	const auth0Connection = new auth0.WebAuth(auth0ConnectionObj);

	// using react-router-dom navigation
	const navigate = useNavigate();

	const urlPath = window.location.pathname;

	useEffect(() => {
		login();
	}, []);

	const logoutUser = () => {
		window.sessionStorage.removeItem('authInfo');
		window.sessionStorage.removeItem('userInfo');
		auth0Connection.logout({ returnTo: `${window.location.origin}/auth/login` });
		dispatch({
			type: LOGOUT
		});
	};

	const login = () => {
		if (state.isLoggedIn || urlPath.includes('auth')) {
			return;
		}
		if (!state.authInfo) {
			applyAuthToken()
				.then((res) => {
					if (!res.success) {
						!urlPath.includes('auth') && logoutUser();
						return;
					}
				})
				.catch((err) => {
					!urlPath.includes('auth') && logoutUser();
				});
		}
	};

	// alerts that are displayed throughout app
	const initialAlertState = {
		open: false,
		message: '',
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'right'
		},
		severity: 'success',
		allowClose: true,
		autoHideDuration: 4000
	};
	const [alert, setAlert] = useState(initialAlertState);

	// apollo queries
	const queryTypes = {
		// single result
		user: QUERY_USER,
		trip: QUERY_TRIP,
		task: QUERY_TASK,
		budget: QUERY_BUDGET,
		// multiple results
		users: QUERY_USERS,
		friendRequests: QUERY_FRIEND_REQUESTS,
		friendRequestsMatch: QUERY_FRIEND_REQUESTS_MATCH,
		tripAttendees: QUERY_TRIP_ATTENDEES,
		tripAttendeesByTripID: QUERY_TRIP_ATTENDEES_BY_TRIP_ID,
		tripAttendeesByAttendeeID: QUERY_TRIP_ATTENDEES_BY_ATTENDEE_ID,
		trips: QUERY_TRIPS,
		tasks: QUERY_TASKS,
		budgets: QUERY_BUDGETS
	};

	// apollo mutations
	const mutationTypes = {
		// create
		addUser: ADD_USER,
		addFriendRequest: ADD_FRIEND_REQUEST,
		addTripAttendee: ADD_TRIP_ATTENDEE,
		addTrip: ADD_TRIP,
		addTask: ADD_TASK,
		addBudget: ADD_BUDGET,
		// update
		editUser: UPDATE_USER,
		editTripAttendee: UPDATE_TRIP_ATTENDEE,
		editFriendRequest: UPDATE_FRIEND_REQUEST,
		editTrip: UPDATE_TRIP,
		editTask: UPDATE_TASK,
		editBudget: UPDATE_BUDGET,
		// delete
		removeTrip: REMOVE_TRIP,
		removeTask: REMOVE_TASK,
		removeBudget: REMOVE_BUDGET
	};

	// queries
	const [getUser] = useLazyQuery(queryTypes['user']);
	const [getTripAttendees] = useLazyQuery(queryTypes['tripAttendees']);
	const [getTripAttendeesByTripID] = useLazyQuery(queryTypes['tripAttendeesByTripID']);
	const [getTripAttendeesByAttendeeID] = useLazyQuery(queryTypes['tripAttendeesByAttendeeID']);
	const [getFriendRequests] = useLazyQuery(queryTypes['friendRequests']);
	const [getFriendRequestsMatch] = useLazyQuery(queryTypes['friendRequestsMatch']);
	const [getAllTrips] = useLazyQuery(queryTypes['trips']);
	const [getSingleTrip] = useLazyQuery(queryTypes['trip']);
	const [getTripBudget] = useLazyQuery(queryTypes['budgets']);
	const [getSingleBudget] = useLazyQuery(queryTypes['budget']);
	const [getTripTask] = useLazyQuery(queryTypes['tasks']);
	const [getSingleTask] = useLazyQuery(queryTypes['task']);

	// mutations
	const [addUser] = useMutation(mutationTypes['addUser']);
	const [addFriendRequest] = useMutation(mutationTypes['addFriendRequest']);
	const [addTrip] = useMutation(mutationTypes['addTrip']);
	const [addTripAttendee] = useMutation(mutationTypes['addTripAttendee']);
	const [addBudget] = useMutation(mutationTypes['addBudget']);
	const [editFriendRequest] = useMutation(mutationTypes['editFriendRequest']);
	const [editTrip] = useMutation(mutationTypes['editTrip']);
	const [editTripAttendee] = useMutation(mutationTypes['editTripAttendee']);
	const [editBudget] = useMutation(mutationTypes['editBudget']);

	const crudFunctions = {
		getUser,
		getTripAttendees,
		getTripAttendeesByTripID,
		getTripAttendeesByAttendeeID,
		getFriendRequests,
		getFriendRequestsMatch,
		getAllTrips,
		getSingleTrip,
		getTripBudget,
		getSingleBudget,
		getTripTask,
		getSingleTask,
		addUser,
		addFriendRequest,
		addTrip,
		addTripAttendee,
		addBudget,
		editFriendRequest,
		editTrip,
		editTripAttendee,
		editBudget
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
					setAlert({
						...alert,
						severity: 'success',
						message: 'Account was successfully created! Login to start using GRIP.'
					});
					navigate('login');
				}
			});
		} catch (err) {
			setAlert({
				...alert,
				severity: 'error',
				message: 'There was a problem creating the account.  Please try again later.'
			});
		}
	};

	// using accessToken to get user info and replacing the token in the url
	const applyAuthToken = async () => {
		let responseObj = {
			success: false
		};
		try {
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
			if (!isLoggedIn && !accessToken) {
				setAlert({ ...alert, message: 'You need to be logged in to see this page.' });
				return responseObj;
			}

			if (accessToken) {
				if (!isLoggedIn) {
					auth0Connection.parseHash(async (err, authResult) => {
						if (authResult) {
							const authId = authResult.idTokenPayload.sub?.split('|')[1];
							const { data } = await getUser({
								variables: { authId: authId }
							});

							runDispatch({
								...dispatchObj,
								user: data.user,
								authInfo: authResult
							});
						} else {
							return { ...responseObj, success: false };
						}
					});
					return {
						...responseObj,
						success: true
					};
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
		} catch (err) {
			setAlert({
				...alert,
				open: true,
				severity: 'error',
				message: `There was a problem accessing your account information.  Please try again later.`
			});
		}
	};

	// authorizing an existing user based on email and password
	const getAuthToken = (authObj = {}) => {
		try {
			const authToSend = { ...auth0AuthObj, ...authObj };
			auth0Connection.login(authToSend, (err) => {
				if (err.code === 'access_denied') {
					setAlert({
						...alert,
						open: true,
						severity: 'error',
						message: `There was a problem logging you in.  Please check the email and password are entered correctly.`
					});
				}
				return;
			});
		} catch (err) {
			return setAlert({
				...alert,
				open: true,
				severity: 'error',
				message: `There was a problem logging you in and gathering your user data.  Please try again later.`
			});
		}
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				login: () => {},
				alert,
				initialAlertState,
				setAlert,
				navigate,
				getAuthToken,
				applyAuthToken,
				register,
				logoutUser,
				crudFunctions
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
