import { Grid, useTheme } from '@mui/material';

// project imports
import CustomTypography from 'views/components/CustomTypography';
import { formatValue } from 'utils/formatting';
import { calculateAmountOfTime } from 'utils/dateCalculations';

const TripDetails = ({ data }) => {
	const theme = useTheme();

	const addressDisplay = formatValue({
		value: { ...data.address },
		type: 'subField',
		subField: 'trip.address'
	});

	const startDate = formatValue({ value: data.startDate, type: 'date' });
	const endDate = formatValue({
		value: data.endDate,
		type: 'date'
	});
	const dateDisplay = `${startDate && endDate ? startDate + ' - ' + endDate : startDate}`;

	const tripCountdown = () => {
		const millisecondsUntilTrip = data.startDate - new Date().valueOf();
		if (millisecondsUntilTrip <= 0) {
			return 0;
		}
		const { string } = calculateAmountOfTime(millisecondsUntilTrip);

		return string;
	};

	const timeRemaining = tripCountdown();

	return (
		<Grid
			container
			sx={{
				textAlign: 'center'
			}}
		>
			{addressDisplay && (
				<Grid item xs={12}>
					<CustomTypography textContent={addressDisplay} />
				</Grid>
			)}
			{dateDisplay && (
				<Grid item xs={12}>
					<CustomTypography textContent={dateDisplay} />
				</Grid>
			)}
			{timeRemaining !== 0 && (
				<Grid item xs={12}>
					<CustomTypography
						textContent={`Trip starts in: ${timeRemaining}`}
						customStyle={{ color: theme.palette.text.secondary }}
					/>
				</Grid>
			)}
			{data.description && (
				<Grid item xs={12}>
					<CustomTypography textContent={data.description} />
				</Grid>
			)}
		</Grid>
	);
};

export default TripDetails;
