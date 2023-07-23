import { useState } from 'react';
import { Grid, IconButton, useTheme } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import FormInput from 'views/components/forms/inputs';
import SubmitButton from 'views/components/SubmitButton';
import useAuth from 'hooks/useAuth';

const Register = ({ onSubmit }) => {
	const theme = useTheme();

	const { register } = useAuth();

	const blankInfo = { email: '', password: '', firstName: '', lastName: '' };

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
				password: Yup.string()
					.min(8, 'Must be at least 8 characters.')
					.matches(
						/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
						'Must have at least one lowercase letter, one uppercase letter, one number, and one special character.'
					)
					.required('Password is required.'),
				firstName: Yup.string().trim().required('First name is required.'),
				lastName: Yup.string().trim().required('Last name is required.')
			})}
			onSubmit={async (values, { setStatus, setSubmitting }) => {
				try {
					values = { ...values, email: values.email.toLowerCase() };
					await register(values);
					onSubmit && (await onSubmit());
				} catch (err) {}
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
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'text'}
									componentProps={{
										name: 'firstName',
										value: values.firstName,
										onChange: handleChange,
										onBlur: handleBlur
									}}
									label={'First Name'}
									required={true}
									error={Boolean(touched.firstName && errors.firstName)}
									helperText={
										touched.firstName &&
										errors.firstName &&
										`${errors.firstName}`
									}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'text'}
									componentProps={{
										name: 'lastName',
										value: values.lastName,
										onChange: handleChange,
										onBlur: handleBlur
									}}
									label={'Last Name'}
									required={true}
									error={Boolean(touched.lastName && errors.lastName)}
									helperText={
										touched.lastName && errors.lastName && `${errors.lastName}`
									}
								/>
							</Grid>
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
											title={'Register'}
											onClick={handleSubmit}
											placeholder={'Register'}
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

export default Register;
