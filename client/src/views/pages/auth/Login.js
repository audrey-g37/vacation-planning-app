import { useState } from 'react';
import { Grid, useTheme, useMediaQuery } from '@mui/material';

// project imports
import FormInput from 'views/components/forms/inputs/index';
import SubmitButton from 'views/components/SubmitButton';
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
		setSubmissionDisabled({
			...submissionDisabled,
			disabled: !formState.email || !formState.password
		});
	};

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			await getAuthToken({ ...formState });
		} catch (err) {
			console.error(err);
		}
		setFormState(initialState);
	};

	const submissionDisabledInitialState = {
		disabled: true,
		message: 'Enter your email and password.'
	};

	const [submissionDisabled, setSubmissionDisabled] = useState(submissionDisabledInitialState);

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
