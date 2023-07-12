import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import useAuth from 'hooks/useAuth';

// project imports
import ViewAllTrips from '../ViewTrip/ViewAllTrips';
import CustomTypography from 'views/components/CustomTypography';
import CircularLoader from 'views/components/CircularLoader';
import { sortTrips } from 'utils/sorting';

const ViewFriends = () => {
	const { user, crudFunctions } = useAuth();

	const { getAllTrips } = crudFunctions;

	const [allTrips, setAllTrips] = useState([]);
	const [loading, setLoading] = useState(true);

	let tripSortingObj = {
		displayLimitNum: 5,
		showOldTrips: false,
		oldToNew: true
	};
	const setUserTripData = async () => {
		!loading && setLoading(true);
		const { data } = await getAllTrips({ variables: { userID: user._id } });
		tripSortingObj = { ...tripSortingObj, tripData: data.trips };
		const tripData = sortTrips(tripSortingObj);

		setAllTrips(tripData);
		setLoading(false);
	};

	const actionSection = (
		<Grid container sx={{ justifyContent: 'center', textAlign: 'center' }}>
			<Grid item xs={12} sx={{ padding: '0.5rem' }}>
				<CustomTypography textContent={'View All'} to={'/view-trips'} />
			</Grid>
		</Grid>
	);

	useEffect(() => {
		user && setUserTripData();
	}, [user?._id]);

	return (
		<>
			{loading && <CircularLoader />}
			<ViewAllTrips
				allTrips={allTrips}
				actionSection={actionSection}
				title={'My Next 5 Trips'}
				dashboardSortingObj={tripSortingObj}
			/>
		</>
	);
};

export default ViewFriends;
