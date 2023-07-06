import { Grid, useTheme } from '@mui/material';
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
					await getAuthToken(values);
					onSubmit && onSubmit();
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
										type: 'password',
										value: values.password,
										onChange: handleChange,
										onBlur: handleBlur
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
