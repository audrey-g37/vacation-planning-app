import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from 'utils/apollo/mutations';
import { useTheme, useMediaQuery, Grid } from '@mui/material';

// project imports
import useAuth from 'hooks/useAuth';
import FormInput from 'views/components/re-usable/inputs';
import SubmitButton from 'views/components/re-usable/SubmitButton';

const Register = () => {
	const theme = useTheme();
	const lgAndUp = useMediaQuery(theme.breakpoints.up('md'));

	const { register } = useAuth();

	const initialState = {
		email: '',
		password: '',
		firstName: '',
		lastName: ''
	};
	const [formState, setFormState] = useState(initialState);

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
			await register(formState);
		} catch (e) {
			console.error(e);
		}
	};

	const submissionDisabled = {
		disabled:
			!formState.email || !formState.password || !formState.firstName || !formState.lastName,
		message: 'All fields are required.'
	};

	return (
		<form>
			<Grid container spacing={theme.spacing(lgAndUp ? 3 : 2)}>
				<Grid item xs={12} md={6}>
					<FormInput
						componentType={'text'}
						componentProps={{
							placeholder: '',
							name: 'firstName',
							type: 'text',
							value: formState.firstName,
							onChange: handleChange
						}}
						label={'First Name'}
						required={true}
						helperText={'First name is required.'}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormInput
						componentType={'text'}
						componentProps={{
							placeholder: '',
							name: 'lastName',
							type: 'text',
							value: formState.lastName,
							onChange: handleChange
						}}
						label={'LastName'}
						required={true}
						helperText={'Last name is required.'}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormInput
						componentType={'text'}
						componentProps={{
							placeholder: 'email@example.com',
							name: 'email',
							type: 'email',
							value: formState.email,
							onChange: handleChange
						}}
						label={'Email'}
						required={true}
						helperText={
							!formState.email
								? 'Email is required.'
								: 'Entry must be a valid email address.'
						}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormInput
						componentType={'text'}
						componentProps={{
							placeholder: 'New Password',
							name: 'password',
							type: 'password',
							value: formState.password,
							onChange: handleChange
						}}
						label={'Password'}
						required={true}
						helperText={'Password is required.'}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={theme.spacing()} sx={{ justifyContent: 'flex-end' }}>
				<Grid item>
					<SubmitButton
						title={'Register'}
						tooltipText={
							!submissionDisabled.disabled ? 'Login' : submissionDisabled.message
						}
						onClick={handleFormSubmit}
						disabled={submissionDisabled.disabled}
					/>
				</Grid>
			</Grid>
		</form>
	);
};

export default Register;
