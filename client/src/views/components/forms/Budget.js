import { Grid, useTheme } from '@mui/material';
import { useParams } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import FormInput from './inputs';
import SubmitButton from '../SubmitButton';
import useAuth from 'hooks/useAuth';
import CustomDivider from '../CustomDivider';

const BudgetForm = ({ edit, formData, onSubmit }) => {
	const theme = useTheme();

	const { crudFunctions, alert, setAlert } = useAuth();

	const { addBudget, editBudget } = crudFunctions;

	const { id: tripID } = useParams();

	const blankInfo = {
		title: '',
		maxAmount: 0,
		actualAmount: 0,
		purchaseDate: '',
		purchasedByUserID: null,
		splitByUserIDs: [],
		tripID: tripID,
		taskID: null
	};

	return (
		<Formik
			initialValues={edit ? formData : blankInfo}
			enableReinitialize
			validationSchema={Yup.object().shape({
				title: Yup.string().trim().required('Title is required.'),
				maxAmount: Yup.number().test({
					name: 'hundredths-place',
					test: (num) =>
						(String(num).includes('.')
							? String(num).split('.')[1]?.length <= 2
							: String(num)) && num >= 0,
					message: 'Must be a valid dollar amount.'
				}),
				actualAmount: Yup.number().test({
					name: 'hundredths-place',
					test: (num) =>
						(String(num).includes('.')
							? String(num).split('.')[1]?.length <= 2
							: String(num)) && num >= 0,
					message: 'Must be a valid dollar amount.'
				})
			})}
			onSubmit={async (values, { setStatus, setSubmitting }) => {
				try {
					let dataToSend = {
						variables: values
					};
					if (edit) {
						await editBudget(dataToSend);
					} else {
						await addBudget(dataToSend);
					}
					setAlert({
						...alert,
						open: true,
						severity: 'success',
						message: `Budget successfully saved!`
					});
					onSubmit && (await onSubmit());
				} catch (err) {
					setAlert({
						...alert,
						open: true,
						severity: 'error',
						message: `There was a problem trying to save the budget data.  Please try again later.`
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
										name: 'maxAmount',
										onChange: handleChange,
										onBlur: handleBlur,
										type: 'number',
										value: values.maxAmount
									}}
									label={'Maximum Amount'}
									error={Boolean(touched.maxAmount && errors.maxAmount)}
									helperText={
										touched.maxAmount &&
										errors.maxAmount &&
										`${errors.maxAmount}`
									}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'text'}
									componentProps={{
										name: 'actualAmount',
										onChange: handleChange,
										onBlur: handleBlur,
										type: 'number',
										value: values.actualAmount
									}}
									label={'Amount Spent'}
									error={Boolean(touched.actualAmount && errors.actualAmount)}
									helperText={
										touched.actualAmount &&
										errors.actualAmount &&
										`${errors.actualAmount}`
									}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'dateTime'}
									componentProps={{
										name: 'purchaseDate',
										value: values.purchaseDate,
										multiline: true,
										minRows: 3,
										onChange: setFieldValue,
										onBlur: setTouched
									}}
									label={'Purchase Date'}
								/>
							</Grid>
						</Grid>
						<CustomDivider margin='0.5rem' />
						<Grid container spacing={theme.spacing()}>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'autocomplete'}
									componentProps={{
										name: 'purchasedByUserID',
										// * trip attendees
										// options: existingFriends,
										multiple: false,
										onChange: setFieldValue,
										onBlur: handleBlur,
										value: values.purchasedByUserID
									}}
									label={'Purchased By'}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								{/* <FormInput
									componentType={'autocomplete'}
									componentProps={{
										name: 'splitByUserIDs',
										// * trip attendees
										// options: existingFriends,
										multiple: true,
										onChange: setFieldValue,
										onBlur: handleBlur,
										value: values.splitByUserIDs
									}}
									label={'Splitting Cost'}
                                    helperText={'Who will be splitting the cost for this purchase. Used to calculate individual spending.'}
								/> */}
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

export default BudgetForm;
