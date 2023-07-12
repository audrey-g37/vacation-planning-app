import { Grid, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import FormInput from './inputs';
import SubmitButton from '../SubmitButton';
import useAuth from 'hooks/useAuth';

const FriendRequestForm = ({ onSubmit }) => {
	const { user, crudFunctions } = useAuth();

	const { getUser, addFriendRequest } = crudFunctions;

	const theme = useTheme();

	const blankInfo = {
		status: 'Pending',
		requestedByUserID: user._id,
		pendingApprovalUserID: '',
		pendingApprovalUserEmail: ''
	};

	return (
		<Formik
			initialValues={blankInfo}
			enableReinitialize
			validationSchema={Yup.object().shape({
				pendingApprovalUserEmail: Yup.string()
					.email('Must be a valid email.')
					.trim()
					.required('Email address is required.')
			})}
			onSubmit={async (values, { setStatus, setSubmitting }) => {
				try {
					let dataToSend = {
						variables: values
					};
					const { data } = await getUser({
						variables: { email: dataToSend.variables.pendingApprovalUserEmail }
					});
					if (data?.user) {
						// todo search for an existing request with the user IDs so we can't request multiple times
						dataToSend = {
							...dataToSend,
							variables: {
								...dataToSend.variables,
								pendingApprovalUserID: data.user._id
							}
						};
						// todo alert the user they are about to request {email address} and confirm they want to continue
						// on continue
						await addFriendRequest(dataToSend)
							.then((res) => console.log({ res }))
							.catch((err) => console.error({ err }));
					} else {
						// todo alert user and ask them if they want to invite the user to join GRIP or try searching another email.
						console.log('No user with matching email.');
					}
					onSubmit && onSubmit();
				} catch (err) {
					console.error(err);
				}
			}}
		>
			{({
				handleChange,
				handleBlur,
				setTouched,
				handleSubmit,
				setFieldValue,
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
										name: 'pendingApprovalUserEmail',
										type: 'email',
										value: values.pendingApprovalUserEmail,
										onChange: handleChange,
										onBlur: handleBlur
									}}
									label={'Email'}
									required={true}
									error={Boolean(
										touched.pendingApprovalUserEmail &&
											errors.pendingApprovalUserEmail
									)}
									helperText={
										touched.pendingApprovalUserEmail &&
										errors.pendingApprovalUserEmail &&
										`${errors.pendingApprovalUserEmail}`
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<Grid
									container
									sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
									spacing={theme.spacing()}
								>
									<Grid item>
										<SubmitButton
											disableElevation
											disabled={isSubmitting}
											title={'Save Changes'}
											onClick={handleSubmit}
											placeholder={'Request'}
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

export default FriendRequestForm;
