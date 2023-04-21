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
	const [state, dispatch] = useReducer(accountReducer, initialState);

	useEffect(() => {
		login();
	}, [dispatch]);

	const queryTypes = {
		user: QUERY_USER,
		users: QUERY_USERS,
		trip: QUERY_TRIP,
		trips: QUERY_TRIPS,
		task: QUERY_TASK,
		tasks: QUERY_TASKS,
		budget: QUERY_BUDGET,
		budgets: QUERY_BUDGETS
	};

	const mutationTypes = {
		addUser: ADD_USER,
		addTrip: ADD_TRIP,
		addTask: ADD_TASK,
		addBudget: ADD_BUDGET,
		updateUser: UPDATE_USER,
		updateTrip: UPDATE_TRIP,
		updateTask: UPDATE_TASK,
		updateBudget: UPDATE_BUDGET,
		removeTrip: REMOVE_TRIP,
		removeTask: REMOVE_TASK,
		removeBudget: REMOVE_BUDGET
	};

	const auth0Connection = new auth0.WebAuth({
		domain: process.env.REACT_APP_AUTH0_CLIENT_DOMAIN,
		clientID: process.env.REACT_APP_AUTH0_CLIENT_ID
	});

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

	const [addUser, { data: userData, loading: userLoading, error: userError }] = useMutation(
		mutationTypes['addUser']
	);

	const register = async (authObj) => {
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
					addUser({
						variables: {
							...authObj,
							authId: res?.Id
						}
					});
					console.log({ userData, userError, userLoading });
				} else setAlert({ ...alert, message: 'There was a problem creating the user.' });
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

	// const for using react-router-dom navigation
	const navigate = useNavigate();

	return (
		<AuthContext.Provider
			value={{
				...state,
				login: () => {},
				register,
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
