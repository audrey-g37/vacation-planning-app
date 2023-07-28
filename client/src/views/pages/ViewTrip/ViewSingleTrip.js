import { useParams } from 'react-router';
import { Grid, useTheme } from '@mui/material';

// project imports
import MainCard from 'views/components/MainCard';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import TripDetails from './TripDetails';
import CircularLoader from 'views/components/CircularLoader';
import ViewAttendeesForTrip from './TripAttendeeGrid';

const ViewSingleTrip = () => {
	const theme = useTheme();
	const { id } = useParams();
	const { crudFunctions } = useAuth();
	const { getSingleTrip, getTripAttendeesByTripID } = crudFunctions;

	const [tripData, setTripData] = useState({ tripDetails: {}, tripAttendees: [] });
	const [loading, setLoading] = useState(false);

	const getTripData = async () => {
		const { data } = await getSingleTrip({ variables: { queryID: id } });
		return data.trip;
	};

	const getAttendeeData = async () => {
		const { data } = await getTripAttendeesByTripID({
			variables: { tripID: id }
		});
		return data.tripAttendeesByTripID;
	};

	const setAllTripData = async (trip = true, attendees = true) => {
		setLoading(true);
		let tripDataObj = tripData;
		if (trip) {
			const tripDetails = await getTripData();
			tripDataObj = { ...tripDataObj, tripDetails: tripDetails };
		}
		if (attendees) {
			const attendees = await getAttendeeData();
			tripDataObj = { ...tripDataObj, tripAttendees: attendees };
		}
		setTripData(tripDataObj);
		setLoading(false);
	};

	useEffect(() => {
		setAllTripData();
	}, []);

	return (
		<Grid container spacing={theme.spacing()}>
			{loading && <CircularLoader />}
			<Grid item xs={12}>
				<MainCard
					title={tripData.tripDetails?.title}
					editItem={'trip'}
					formData={tripData.tripDetails}
					collection={'trip'}
					queryResults={async () => await setAllTripData(true, false)}
				>
					<TripDetails data={tripData.tripDetails} />
				</MainCard>
			</Grid>
			<Grid item xs={12} md={4}>
				<MainCard
					title={'Attendees'}
					collection={'tripAttendee'}
					newItem='Trip Attendee'
					queryResults={async () => await setAllTripData(false, true)}
					sx={{ margin: '0 1rem' }}
				>
					{!loading && <ViewAttendeesForTrip data={tripData.tripAttendees} />}
				</MainCard>
			</Grid>
		</Grid>
	);
};

export default ViewSingleTrip;
