import { Grid, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import FormInput from './inputs';
import SubmitButton from '../SubmitButton';
import useAuth from 'hooks/useAuth';
import CustomDivider from '../CustomDivider';

const TripForm = ({ edit, formData, onSubmit }) => {
	const { userSessionInfo: user, crudFunctions } = useAuth();

	const { addTrip, editTrip } = crudFunctions;

	const theme = useTheme();

	const blankInfo = {
		title: '',
		description: '',
		address: {
			street1: '',
			street2: '',
			city: '',
			state: '',
			country: '',
			zipCode: ''
		},
		startDate: '',
		endDate: '',
		userID: user._id
	};

	return (
		<Formik
			initialValues={edit ? formData : blankInfo}
			enableReinitialize
			validationSchema={Yup.object().shape({
				title: Yup.string().trim().required('Trip name is required.')
			})}
			onSubmit={async (values, { setStatus, setSubmitting }) => {
				try {
					let dataToSend = {
						variables: values
					};
					for (const [key, value] of Object.entries(dataToSend.variables.address)) {
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
					delete dataToSend.variables.address;
					if (edit) {
						dataToSend = {
							...dataToSend,
							variables: { ...dataToSend.variables, queryID: values._id }
						};
						await editTrip(dataToSend);
					} else {
						await addTrip(dataToSend);
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
										name: 'title',
										value: values.title,
										onChange: handleChange,
										onBlur: handleBlur
									}}
									label={'Name'}
									required={true}
									error={Boolean(touched.title && errors.title)}
									helperText={touched.title && errors.title && `${errors.title}`}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormInput
									componentType={'text'}
									componentProps={{
										name: 'description',
										type: 'description',
										value: values.description,
										multiline: true,
										minRows: 3,
										onChange: handleChange,
										onBlur: handleBlur
									}}
									label={'Details'}
									error={Boolean(touched.description && errors.description)}
									helperText={
										touched.description &&
										errors.description &&
										`${errors.description}`
									}
								/>
							</Grid>
							<CustomDivider />
							<Grid item xs={12}>
								<FormInput
									componentType={'text'}
									componentProps={{
										name: 'street1',
										value: values.address.street1,
										onChange: handleChange,
										onBlur: handleBlur
									}}
									label={'Street Line One'}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormInput
									componentType={'text'}
									componentProps={{
										name: 'address.street2',
										value: values.address.street2,
										onChange: handleChange,
										onBlur: handleBlur
									}}
									label={'Street Line Two'}
									helperText={'Apt #, etc.'}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'text'}
									componentProps={{
										name: 'address.city',
										value: values.address.city,
										onChange: handleChange,
										onBlur: handleBlur
									}}
									label={'City'}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormInput
									componentType={'text'}
									componentProps={{
										name: 'address.state',
										value: values.address.state,
										onChange: handleChange,
										onBlur: handleBlur
									}}
									label={'State'}
								/>
							</Grid>
							{/* <Grid item xs={12} md={6}>
                                <AutoCompleteInput
                                    name={'registeredAddress.country'}
                                    label={'Country*'}
                                    options={countryOptions}
                                    setFieldValue={setFieldValue}
                                    onBlur={handleBlur}
                                    value={values.registeredAddress.country}
                                    valueSubField={'label'}
                                    error={Boolean(
                                        getIn(touched, 'registeredAddress.country') &&
                                            getIn(errors, 'registeredAddress.country')
                                    )}
                                    helperText={
                                        getIn(touched, 'registeredAddress.country') &&
                                        getIn(errors, 'registeredAddress.country') &&
                                        `${errors.registeredAddress.country}`
                                    }
                                />
                            </Grid> */}
						</Grid>
						<Grid item xs={12} md={6}>
							<FormInput
								componentType={'text'}
								componentProps={{
									name: 'address.zipCode',
									value: values.address.zipCode,
									onChange: handleChange,
									onBlur: handleBlur
								}}
								label={'Zip Code'}
							/>
						</Grid>

						<br />
						<Grid
							container
							sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
							spacing={theme.spacing()}
						>
							<SubmitButton
								disableElevation
								disabled={isSubmitting || values.educationLevel === ''}
								title={'Save Changes'}
								onClick={handleSubmit}
								placeholder={'Save Changes'}
							/>
						</Grid>
					</form>
				);
			}}
		</Formik>
	);
};

export default TripForm;
