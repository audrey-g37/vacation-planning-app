import { useState } from 'react';
import { Grid, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import FormInput from './inputs';
import ConfirmationDialog from '../ConfirmationDialog';
import SubmitButton from '../SubmitButton';
import useAuth from 'hooks/useAuth';

const FriendRequestForm = ({ onSubmit }) => {
	const { user, crudFunctions } = useAuth();

	const { getUser, addFriendRequest, getFriendRequests } = crudFunctions;

	const theme = useTheme();

	const blankInfo = {
		status: 'Pending',
		requestedByUserID: user._id,
		pendingApprovalUserID: '',
		pendingApprovalUserEmail: ''
	};

	const [confirmation, setConfirmation] = useState({
		open: false,
		data: blankInfo,
		newUser: false
	});

	const confirmAddFriend = async () => {
		await addFriendRequest(confirmation.data);
		setConfirmation({
			...confirmation,
			open: false,
			data: blankInfo
		});
		if (confirmation.newUser) {
			// todo email the user and invite them to join
		}
		onSubmit && (await onSubmit());
	};

	const checkForExistingRequestMatches = async () => {
		// checking for requests that the user has already made to this person
		const ourDataToSend = {
			variables: {
				requestedByUserID: user._id,
				pendingApprovalUserID: confirmation.pendingApprovalUserID
			}
		};
		// used to check for requests that exist for user to review (made by who user is requesting)
		const theirDataToSend = {
			variables: {
				requestedByUserID: confirmation.pendingApprovalUserID,
				pendingApprovalUserID: user._id
			}
		};
		const { data: existingRequest1 } = await getFriendRequests(ourDataToSend);
		const { data: existingRequest2 } = await getFriendRequests(theirDataToSend);
		if (
			existingRequest1?.friendRequests?.length > 0 ||
			existingRequest2?.friendRequests?.length > 0
		) {
			return existingRequest1?.friendRequests?.[0] || existingRequest2?.friendRequests?.[0];
		}
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
						variables: {
							email: dataToSend.variables.pendingApprovalUserEmail.toLowerCase()
						}
					});
					if (data?.user) {
						dataToSend = {
							...dataToSend,
							variables: {
								...dataToSend.variables,
								pendingApprovalUserID: data.user._id
							}
						};
						const existingRequest = await checkForExistingRequestMatches();
						if (!existingRequest) {
							setConfirmation({
								...confirmation,
								open: true,
								data: dataToSend,
								newUser: false
							});
						} else {
							// todo set an alert and show message to user with request status and who request is pending
							console.log('A request has already been created', { existingRequest });
							onSubmit && onSubmit();
						}
					} else {
						setConfirmation({
							...confirmation,
							open: true,
							data: dataToSend,
							newUser: true
						});
					}
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
					<>
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
												title={'Add Friend'}
												onClick={handleSubmit}
												placeholder={'Request'}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</form>
						{confirmation.open && (
							<ConfirmationDialog
								open={confirmation.open}
								setClosed={() => setConfirmation({ ...confirmation, open: false })}
								onCancel={() =>
									setConfirmation({
										...confirmation,
										open: false,
										data: blankInfo
									})
								}
								onConfirm={confirmAddFriend}
								textContent={
									confirmation.newUser
										? `There is no user with the email ${values.pendingApprovalUserEmail}.  Send an email inviting them to create a GRIP account?`
										: `You are about to send a friend request to ${values.pendingApprovalUserEmail}.`
								}
							/>
						)}
					</>
				);
			}}
		</Formik>
	);
};

export default FriendRequestForm;
