import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from 'utils/mutations';
import Auth from 'utils/auth';
import './Login.css';
import { Button } from '@mui/material';

const Login = (props) => {
	const [formState, setFormState] = useState({ username: '', password: '' });
	const [login, { error, data }] = useMutation(LOGIN_USER);

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value
		});
	};

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await login({
				variables: { ...formState }
			});
			Auth.login(data.login.token);
			Auth.storeUsername(formState.username);
			window.location.replace('/dashboard');
		} catch (e) {
			console.error(e);
		}

		// clear form values
		setFormState({
			username: '',
			password: ''
		});
	};

	return (
		<div className='login'>
			<h4 className='login-main-text card-header bg-dark text-light p-2'>Login</h4>
			<div className='login-card text-center card'>
				{data ? (
					<p>
						Success! You may now head <Link to='/'>back to the homepage.</Link>
					</p>
				) : (
					<form className='login-form' onSubmit={handleFormSubmit}>
						<input
							className='login-form-input form-input'
							placeholder='Username'
							name='username'
							type='text'
							value={formState.username}
							onChange={handleChange}
						/>
						<input
							className='login-form-input form-input'
							placeholder='******'
							name='password'
							type='password'
							value={formState.password}
							onChange={handleChange}
						/>
						<Button className='login-btn' variant='dark' onClick={handleFormSubmit}>
							Login
						</Button>
						{''}
					</form>
				)}

				{error && <div className='my-3 p-3 bg-danger text-white'>{error.message}</div>}
			</div>
		</div>
	);
};

export default Login;
