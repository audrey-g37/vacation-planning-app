import { Grid, useTheme } from '@mui/material';
import { useParams } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import FormInput from './inputs';
import SubmitButton from '../SubmitButton';
import useAuth from 'hooks/useAuth';
import CustomDivider from '../CustomDivider';
import { tripAttendeeOptions } from 'utils/options';
import { useEffect, useState } from 'react';

const TripAttendeeForm = ({ edit, formData, onSubmit }) => {
	const { user, crudFunctions, alert, setAlert } = useAuth();

	const { getFriendRequests, addTripAttendee, editTripAttendee } = crudFunctions;

	const { id: tripID } = useParams();

	const theme = useTheme();

	const [existingFriends, setExistingFriends] = useState([]);

	const blankInfo = {
		status: 'Invited',
		tripPermissions: {
			editTripDetails: false,
			addTask: 'None',
			editTask: 'None',
			addBudget: 'None',
			editBudget: 'None',
			addAttendee: 'None',
			editAttendee: 'None'
		},
		attendeeUserID: null,
		tripID: tripID
	};

	useEffect(() => {
		async function getExistingFriends() {
			const dataToSend = {
				variables: {
					requestedByUserID: user._id,
					pendingApprovalUserID: user._id,
					pendingApprovalUserEmail: user.email
				}
			};
			const { data } = await getFriendRequests(dataToSend);
			const friends = data.friendRequests.reduce((prev, next) => {
				let existing = prev;
				const { pendingApprovalUserID, requestedByUserID, status } = next;
				if (status === 'Approved') {
					const useRequestedByUserDetails = pendingApprovalUserID._id === user._id;
					let dataForFriend = {
						value: useRequestedByUserDetails
							? requestedByUserID._id
							: pendingApprovalUserID._id,
						label: useRequestedByUserDetails
							? `${requestedByUserID.firstName} ${requestedByUserID.lastName}`
							: `${pendingApprovalUserID.firstName} ${pendingApprovalUserID.lastName}`
					};
					existing.push(dataForFriend);
				}
				return existing;
			}, []);

			setExistingFriends(friends);
		}
		getExistingFriends();
	}, []);

	return (
		<Formik
			initialValues={edit ? formData : blankInfo}
			enableReinitialize
			validationSchema={Yup.object().shape({})}
			onSubmit={async (values, { setStatus, setSubmitting }) => {
				try {
					let dataToSend = {
						variables: values
					};
					for (const [key, value] of Object.entries(
						dataToSend.variables?.tripPermissions
					)) {
						if (key !== '_id' && key !== '__typename' && value) {
							dataToSend = {
								...dataToSend,
								variables: {
									...dataToSend.variables,
									[key]: value
								}
							};
						}
					}
					delete dataToSend.variables.tripPermissions;
					if (edit) {
						dataToSend = {
							...dataToSend,
							variables: { ...dataToSend.variables, queryID: values._id }
						};
						await editTripAttendee(dataToSend);
					} else {
						await addTripAttendee(dataToSend);
					}
					setAlert({
						...alert,
						open: true,
						severity: 'success',
						message: `Attendee successfully saved!`
					});
					onSubmit && (await onSubmit());
				} catch (err) {
					setAlert({
						...alert,
						open: true,
						severity: 'error',
						message: `There was a problem trying to save the attendee data.  Please try again later.`
					});
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
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'autocomplete'}
									componentProps={{
										name: 'attendeeUserID',
										options: existingFriends,
										useIDValue: true,
										onChange: setFieldValue,
										onBlur: handleBlur,
										value: values.attendeeUserID
									}}
									label={'Name:'}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'switch'}
									componentProps={{
										name: 'tripPermissions.editTripDetails',
										onChange: handleChange,
										onBlur: handleBlur,
										value: values.tripPermissions?.editTripDetails
									}}
									label={
										'Edit Trip Information (e.g. title, description, dates, etc.)?'
									}
								/>
							</Grid>
						</Grid>
						<CustomDivider margin='0.5rem' />
						<Grid container spacing={theme.spacing()}>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'autocomplete'}
									componentProps={{
										name: 'tripPermissions.addTask',
										onChange: setFieldValue,
										onBlur: handleBlur,
										value: values.tripPermissions?.addTask,
										options: tripAttendeeOptions.permissions,
										group: false
									}}
									label={'Add Tasks?'}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'autocomplete'}
									componentProps={{
										name: 'tripPermissions.editTask',
										onChange: setFieldValue,
										onBlur: handleBlur,
										value: values.tripPermissions?.editTask,
										options: tripAttendeeOptions.permissions,
										group: false
									}}
									label={'Edit Tasks?'}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'autocomplete'}
									componentProps={{
										name: 'tripPermissions.addBudget',
										onChange: setFieldValue,
										onBlur: handleBlur,
										value: values.tripPermissions?.addBudget,
										options: tripAttendeeOptions.permissions,
										group: false
									}}
									label={'Add Expenses?'}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'autocomplete'}
									componentProps={{
										name: 'tripPermissions.editBudget',
										onChange: setFieldValue,
										onBlur: handleBlur,
										value: values.tripPermissions?.editBudget,
										options: tripAttendeeOptions.permissions,
										group: false
									}}
									label={'Edit Expenses?'}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'autocomplete'}
									componentProps={{
										name: 'tripPermissions.addAttendee',
										onChange: setFieldValue,
										onBlur: handleBlur,
										value: values.tripPermissions?.addAttendee,
										options: tripAttendeeOptions.permissions,
										group: false
									}}
									label={'Add Attendees?'}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'autocomplete'}
									componentProps={{
										name: 'tripPermissions.editAttendee',
										onChange: setFieldValue,
										onBlur: handleBlur,
										value: values.tripPermissions?.editAttendee,
										options: tripAttendeeOptions.permissions,
										group: false
									}}
									label={'Edit Attendees?'}
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
											title={`Save ${edit ? ' Changes' : ''}`}
											onClick={handleSubmit}
											placeholder={'Save Changes'}
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

export default TripAttendeeForm;
