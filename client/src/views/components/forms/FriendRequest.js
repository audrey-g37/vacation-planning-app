import { useState } from 'react';
import { Grid, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import FormInput from './inputs';
import ConfirmationDialog from '../ConfirmationDialog';
import SubmitButton from '../SubmitButton';
import useAuth from 'hooks/useAuth';
import { sendEmailMessage } from 'utils/server-api';

const FriendRequestForm = ({ onSubmit }) => {
	const { user, crudFunctions, alert, setAlert } = useAuth();

	const { getUser, addFriendRequest, getFriendRequestsMatch } = crudFunctions;

	const theme = useTheme();

	const blankInfo = {
		status: 'Pending',
		requestedByUserID: user._id,
		pendingApprovalUserID: '',
		pendingApprovalUserEmail: ''
	};

	const initialConfirmationState = {
		open: false,
		data: blankInfo,
		newUser: false
	};

	const [confirmation, setConfirmation] = useState(initialConfirmationState);

	let emailInfo = {
		emailGroup: [],
		templateData: { user: { firstName: user.firstName, lastName: user.lastName } }
	};

	const searchForUser = async (email) => {
		const { refetch } = await getUser({
			variables: {
				email: email
			}
		});
		return await refetch({ email: email })
			.then((res) => res.data.user)
			.catch((err) =>
				setAlert({
					...alert,
					open: true,
					severity: 'error',
					message: `There was a problem trying to look for an existing GRIP account for ${email}.  Please try again later.`
				})
			);
	};

	const confirmAddFriend = async () => {
		const addRequest = async () => await addFriendRequest({ variables: confirmation.data });
		if (confirmation.newUser) {
			emailInfo = {
				...emailInfo,
				emailGroup: [
					...emailInfo.emailGroup,
					...[{ toEmails: [confirmation.data?.pendingApprovalUserEmail] }]
				]
			};
			await sendEmailMessage('join-grip-friend-request', emailInfo)
				.then(async () => await addRequest())
				.catch((err) => {
					return setAlert({
						...alert,
						open: true,
						severity: 'error',
						message: `There was a problem sending an email to ${confirmation.data.pendingApprovalUserEmail}.  Please try again later.`
					});
				});
		} else {
			await addRequest();
		}
		setAlert({ ...alert, open: true, severity: 'success', message: `Friend request sent!` });
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

	const alertOfExistingRequest = async (existingRequest) => {
		setAlert({
			...alert,
			open: true,
			severity: 'info',
			message: `A request is already pending.  Waiting for ${
				existingRequest.pendingApprovalUserID?._id === user._id
					? 'you'
					: existingRequest.pendingApprovalUserID?.firstName ||
					  existingRequest.pendingApprovalUserEmail
			} to approve.`
		});
		setConfirmation(initialConfirmationState);
		onSubmit && (await onSubmit());
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
					let dataObj = {
						...values,
						pendingApprovalUserEmail: values.pendingApprovalUserEmail.toLowerCase()
					};

					const userMatch = await searchForUser(dataObj.pendingApprovalUserEmail);

					if (userMatch) {
						const idToUse = userMatch._id;
						dataObj = {
							...dataObj,
							pendingApprovalUserID: idToUse
						};

						const existingRequest = await checkForExistingRequestMatches(dataObj);
						if (!existingRequest) {
							setConfirmation({
								open: true,
								newUser: false,
								data: dataObj
							});
						} else {
							await alertOfExistingRequest(existingRequest);
						}
					} else {
						const existingRequest = await checkForExistingRequestMatches(dataObj);
						!existingRequest
							? setConfirmation({
									...confirmation,
									open: true,
									data: { ...dataObj, pendingApprovalUserID: null },
									newUser: existingRequest ? false : true
							  })
							: await alertOfExistingRequest(existingRequest);
					}
				} catch (err) {
					setAlert({
						...alert,
						open: true,
						severity: 'error',
						message: `There was a problem trying to submit the friend request.  Please try again later.`
					});
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
						{confirmation.open && (
							<ConfirmationDialog
								open={confirmation.open}
								setClosed={() => setConfirmation(initialConfirmationState)}
								onCancel={() => setConfirmation(initialConfirmationState)}
								onConfirm={async () => await confirmAddFriend()}
								textContent={
									confirmation.newUser
										? `There is no user with the email ${values.pendingApprovalUserEmail}.  Send an email inviting them to create a GRIP account?`
										: `You are about to send a friend request to ${values.pendingApprovalUserEmail}.`
								}
							/>
						)}
					</form>
				);
			}}
		</Formik>
	);
};

export default FriendRequestForm;
