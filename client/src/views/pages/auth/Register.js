import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from 'utils/apollo/mutations';
import { Button } from '@mui/material';

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleInputChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;

		if (name === 'username') {
			setUsername(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	};

	// const [addUser, {error}] = useMutation(ADD_USER)

	// const [formState, setFormState] = useState({
	//   username: '',
	//   password: '',
	// });
	const [addUser, { error, data }] = useMutation(ADD_USER);

	// // update state based on form input changes
	// const handleChange = (event) => {
	//   const { name, value } = event.target;

	//   setFormState({
	//     ...formState,
	//     [name]: value,
	//   });
	// };

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			await addUser({
				variables: {
					username: username,
					password: password
				}
			}).then((data) => {
				setUsername('');
				setPassword('');
				// console.log(data)
			});
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			{data ? (
				<p>
					Success! You may now <Link to='/'>login</Link> to get started!
				</p>
			) : (
				<form>
					<input
						className='signup-form-input form-input'
						placeholder='Your username'
						name='username'
						type='text'
						value={username}
						onChange={handleInputChange}
					/>
					<input
						className='signup-form-input form-input'
						placeholder='******'
						name='password'
						type='password'
						value={password}
						onChange={handleInputChange}
					/>
					<Button
						className='signup-btn'
						style={{ cursor: 'pointer' }}
						variant='dark'
						onClick={handleFormSubmit}
					>
						Register
					</Button>
				</form>
			)}

			{error && <div className='my-3 p-3 bg-danger text-white'>{error.message}</div>}
		</div>
	);
};

export default Register;
