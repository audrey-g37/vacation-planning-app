import { useState } from 'react';

import { Grid, useTheme, IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import FormInput from 'views/components/forms/inputs';
import SubmitButton from 'views/components/SubmitButton';
import useAuth from 'hooks/useAuth';

const Login = ({ onSubmit }) => {
	const theme = useTheme();

	const { getAuthToken } = useAuth();

	const blankInfo = { email: '', password: '' };

	const [showPassword, setShowPassword] = useState(false);

	return (
		<Formik
			initialValues={blankInfo}
			enableReinitialize
			validationSchema={Yup.object().shape({
				email: Yup.string()
					.email('Must be a valid email.')
					.trim()
					.required('Email is required.'),
				password: Yup.string().required('Password is required.')
			})}
			onSubmit={async (values, { setStatus, setSubmitting }) => {
				try {
					values = { ...values, email: values.email.toLowerCase() };
					if (
						values.email === 'testuser@test-grip.org' &&
						values.password === 'testing123'
					) {
						values = {
							...values,
							email: process.env.REACT_APP_DEMO_EMAIL,
							password: process.env.REACT_APP_DEMO_PASSWORD
						};
					}
					await getAuthToken(values);
					onSubmit && (await onSubmit());
				} catch (err) {
					console.error(err);
				}
			}}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
				touched,
				errors,
				values
			}) => {
				return (
					<form noValidate>
						<Grid container spacing={theme.spacing()}>
							<Grid item xs={12}>
								<FormInput
									componentType={'text'}
									componentProps={{
										name: 'email',
										type: 'email',
										value: values.email,
										onChange: handleChange,
										onBlur: handleBlur
									}}
									label={'Email'}
									required={true}
									error={Boolean(touched.email && errors.email)}
									helperText={touched.email && errors.email && `${errors.email}`}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormInput
									componentType={'text'}
									componentProps={{
										name: 'password',
										type: !showPassword ? 'password' : 'text',
										value: values.password,
										onChange: handleChange,
										onBlur: handleBlur,
										inputAdornment: {
											icon: (
												<IconButton
													onClick={() => setShowPassword(!showPassword)}
												>
													{showPassword ? (
														<VisibilityOffIcon
															sx={{
																color: theme.palette.primary.dark
															}}
														/>
													) : (
														<Visibility
															sx={{
																color: theme.palette.primary.dark
															}}
														/>
													)}
												</IconButton>
											),
											position: 'end'
										}
									}}
									label={'Password'}
									required={true}
									error={Boolean(touched.password && errors.password)}
									helperText={
										touched.password && errors.password && `${errors.password}`
									}
								/>
							</Grid>
							<Grid item xs={12} sx={{ margin: '1rem 0 0' }}>
								<Grid
									container
									sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
									spacing={theme.spacing()}
								>
									<Grid item>
										<SubmitButton
											disableElevation
											disabled={isSubmitting}
											title={'Login'}
											onClick={handleSubmit}
											placeholder={'Login'}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</form>
				);
			}}
		</Formik>
	);
};

export default Login;
