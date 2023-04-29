import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, useTheme, useMediaQuery } from '@mui/material';

// project imports
import FormInput from 'views/components/re-usable/inputs';
import SubmitButton from 'views/components/re-usable/SubmitButton';
import useAuth from 'hooks/useAuth';

const Login = () => {
	const theme = useTheme();
	const lgAndUp = useMediaQuery(theme.breakpoints.up('md'));

	const { getAuthToken } = useAuth();

	const initialState = { email: '', password: '' };
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
			await getAuthToken({ ...formState });
			setFormState(initialState);
		} catch (e) {
			console.error(e);
		}
	};

	const submissionDisabled = {
		disabled: !formState.email || !formState.password,
		message: 'Enter your email and password.'
	};

	return (
		<>
			<form>
				<Grid container spacing={theme.spacing(lgAndUp ? 3 : 2)}>
					<Grid item xs={12}>
						<FormInput
							componentType={'text'}
							componentProps={{
								placeholder: '',
								name: 'email',
								type: 'email',
								value: formState.email,
								onChange: handleChange
							}}
							label={'Email'}
							required={true}
							// error={!formState.username}
							helperText={'Email is required.'}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormInput
							componentType={'text'}
							componentProps={{
								placeholder: '',
								name: 'password',
								type: 'password',
								value: formState.password,
								onChange: handleChange
							}}
							label={'Password'}
							required={true}
							// error={!formState.password}
							helperText={'Password is required.'}
						/>
					</Grid>
					<Grid container spacing={theme.spacing()} sx={{ justifyContent: 'flex-end' }}>
						<Grid item>
							<SubmitButton
								title={'Login'}
								tooltipText={
									!submissionDisabled.disabled
										? 'Login'
										: submissionDisabled.message
								}
								onClick={handleFormSubmit}
								disabled={submissionDisabled.disabled}
							/>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default Login;
