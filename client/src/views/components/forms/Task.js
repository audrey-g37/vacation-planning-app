import { useState, useEffect } from 'react';
import { Grid, useTheme } from '@mui/material';
import { useParams } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import FormInput from './inputs';
import SubmitButton from '../SubmitButton';
import useAuth from 'hooks/useAuth';
import CustomDivider from '../CustomDivider';
import { taskCompletionStatus } from 'utils/options';
import CustomTypography from '../CustomTypography';

const TaskForm = ({ edit, formData, onSubmit }) => {
	const theme = useTheme();

	const { crudFunctions, alert, setAlert } = useAuth();

	const { addTask, editTask } = crudFunctions;

	const { id: tripID } = useParams();

	const [dropdownOfAttendees, setDropdownOfAttendees] = useState([]);

	const blankInfo = {
		title: '',
		textDetails: '',
		adultQuantity: 0,
		childrenQuantity: 0,
		// todo: update details with task sub fields
		// details: {},
		completionOrder: 1,
		dueDate: '',
		status: 'Not Started',
		assignedToUserID: null,
		tripID: tripID
	};

	const createDropdownOfAttendees = () => {
		const attendees = formData.tripAttendees.map((attendee) => {
			return {
				value: attendee.attendeeUserID._id,
				label: `${attendee.attendeeUserID.firstName} ${attendee.attendeeUserID.lastName}`
			};
		});
		setDropdownOfAttendees(attendees);
	};

	useEffect(() => {
		createDropdownOfAttendees();
	}, []);

	return (
		<Formik
			initialValues={edit ? formData : blankInfo}
			enableReinitialize
			validationSchema={Yup.object().shape({
				title: Yup.string().trim().required('Title is required.'),
				adultQuantity: Yup.number()
					.min(0, 'Must be a positive number.')
					.integer('Must be a whole number.'),
				childrenQuantity: Yup.number()
					.min(0, 'Must be a positive number.')
					.integer('Must be a whole number.')
			})}
			onSubmit={async (values, { setStatus, setSubmitting }) => {
				try {
					let dataToSend = {
						variables: values
					};
					if (edit) {
						await editTask(dataToSend);
					} else {
						await addTask(dataToSend);
					}
					setAlert({
						...alert,
						open: true,
						severity: 'success',
						message: `Task successfully saved!`
					});
					onSubmit && (await onSubmit());
				} catch (err) {
					setAlert({
						...alert,
						open: true,
						severity: 'error',
						message: `There was a problem trying to save the task.  Please try again later.`
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
									componentType={'text'}
									componentProps={{
										name: 'title',
										onChange: handleChange,
										onBlur: handleBlur,
										value: values.title
									}}
									label={'Title'}
									required={true}
									error={Boolean(touched.title && errors.title)}
									helperText={touched.title && errors.title && `${errors.title}`}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'text'}
									componentProps={{
										name: 'textDetails',
										onChange: handleChange,
										onBlur: handleBlur,
										value: values.textDetails
									}}
									label={'Details'}
									required={false}
								/>
							</Grid>
						</Grid>
						<CustomDivider margin='0.5rem' />
						<Grid container spacing={theme.spacing()}>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'text'}
									componentProps={{
										name: 'adultQuantity',
										onChange: handleChange,
										onBlur: handleBlur,
										type: 'number',
										value: values.adultQuantity
									}}
									label={'Number of Adults'}
									error={Boolean(touched.adultQuantity && errors.adultQuantity)}
									helperText={
										(touched.adultQuantity &&
											errors.adultQuantity &&
											`${errors.adultQuantity}`) ||
										`How many people age 18 and older?`
									}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'text'}
									componentProps={{
										name: 'childrenQuantity',
										onChange: handleChange,
										onBlur: handleBlur,
										type: 'number',
										value: values.childrenQuantity
									}}
									label={'Number of Children'}
									error={Boolean(
										touched.childrenQuantity && errors.childrenQuantity
									)}
									helperText={
										(touched.childrenQuantity &&
											errors.childrenQuantity &&
											`${errors.childrenQuantity}`) ||
										`How many people under age 18?`
									}
								/>
							</Grid>
							<Grid item xs={12} textAlign={'right'}>
								<CustomTypography
									customStyle={{
										color: theme.palette.text.secondary
									}}
									textContent={`Total Number of People: ${
										Number(values.adultQuantity) +
										Number(values.childrenQuantity)
									}`}
								/>
							</Grid>
						</Grid>
						<CustomDivider margin='0.5rem' />
						<Grid container spacing={theme.spacing()}>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'dateTime'}
									componentProps={{
										name: 'dueDate',
										value: values.dueDate,
										multiline: true,
										minRows: 3,
										onChange: setFieldValue,
										onBlur: setTouched
									}}
									label={'Due Date'}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'autocomplete'}
									componentProps={{
										name: 'status',
										value: values.status,
										multiple: false,
										options: taskCompletionStatus,
										onChange: setFieldValue,
										onBlur: setTouched
									}}
									label={'Completion Status'}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'autocomplete'}
									componentProps={{
										name: 'assignedToUserID',
										options: dropdownOfAttendees,
										multiple: false,
										onChange: setFieldValue,
										onBlur: handleBlur,
										value: values.assignedToUserID
									}}
									label={'Assigned To'}
								/>
							</Grid>
							<Grid item xs={12}>
								<Grid
									container
									sx={{
										justifyContent: 'flex-end',
										alignItems: 'center'
									}}
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

export default TaskForm;
