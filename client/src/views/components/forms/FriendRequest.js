import { useState } from 'react';
import { Grid, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import FormInput from './inputs';
import ConfirmationDialog from '../ConfirmationDialog';
import SubmitButton from '../SubmitButton';
import useAuth from 'hooks/useAuth';
import { sendEmailMessage } from 'utils/sendgrid';

const FriendRequestForm = ({ onSubmit }) => {
	const { user, crudFunctions } = useAuth();

	const { getUser, addFriendRequest, getFriendRequestsMatch } = crudFunctions;

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

	let emailInfo = {
		emailGroup: [],
		templateData: { user: { firstName: user.firstName, lastName: user.lastName } }
	};

	const confirmAddFriend = async () => {
		await addFriendRequest({ variables: confirmation.data });
		if (confirmation.newUser) {
			emailInfo = {
				...emailInfo,
				emailGroup: [
					...emailInfo.emailGroup,
					...[{ toEmails: [confirmation.data?.pendingApprovalUserEmail] }]
				]
			};
			await sendEmailMessage('join-grip-friend-request', emailInfo);
		}
		setConfirmation({
			...confirmation,
			open: false,
			data: blankInfo
		});
		onSubmit && (await onSubmit());
	};

	const checkForExistingRequestMatches = async (dataObj) => {
		let existingRequest;
		// used to check for requests that exist for user to review (made by the friend the user is requesting)
		const theirDataToSend = {
			variables: {
				requestedByUserID: dataObj.pendingApprovalUserID,
				pendingApprovalUserID: user._id
			}
		};
		// checking for requests that the user has already made to this person
		const ourDataToSend = {
			variables: {
				requestedByUserID: user._id,
				pendingApprovalUserID: dataObj.pendingApprovalUserID
			}
		};
		// checking for requests that the user has already made to this person
		const ourDataToSendEmail = {
			variables: {
				requestedByUserID: user._id,
				pendingApprovalUserEmail: dataObj.pendingApprovalUserEmail
			}
		};

		if (theirDataToSend.variables.requestedByUserID) {
			const { data } = await getFriendRequestsMatch(theirDataToSend);
			if (data?.friendRequestsMatch?.length > 0) {
				existingRequest = data?.friendRequestsMatch[0];
			}
		}
		if (ourDataToSend.variables.pendingApprovalUserID) {
			const { data } = await getFriendRequestsMatch(ourDataToSend);
			if (data?.friendRequestsMatch?.length > 0) {
				existingRequest = data?.friendRequestsMatch[0];
			}
		} else if (ourDataToSendEmail.variables.pendingApprovalUserEmail) {
			const { data } = await getFriendRequestsMatch(ourDataToSendEmail);
			if (data?.friendRequestsMatch?.length > 0) {
				existingRequest = data?.friendRequestsMatch[0];
			}
		}

		return existingRequest;
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
					let dataObj = values;

					const { data } = await getUser({
						variables: {
							email: dataObj.pendingApprovalUserEmail.toLowerCase()
						}
					});
					if (data?.user) {
						const idToUse = data.user._id;
						dataObj = {
							...dataObj,
							pendingApprovalUserID: idToUse
						};

						const existingRequest = await checkForExistingRequestMatches(dataObj);
						if (!existingRequest) {
							setConfirmation({
								...confirmation,
								open: true,
								newUser: false,
								data: dataObj
							});
						} else {
							// todo set an alert and show message to user with request status and who request is pending
							console.log('A request has already been created', { existingRequest });
							setConfirmation({ ...confirmation, data: blankInfo });
							onSubmit && (await onSubmit());
						}
					} else {
						setConfirmation({
							...confirmation,
							open: true,
							data: dataObj,
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
								setClosed={() =>
									setConfirmation({
										...confirmation,
										open: false,
										data: blankInfo
									})
								}
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
