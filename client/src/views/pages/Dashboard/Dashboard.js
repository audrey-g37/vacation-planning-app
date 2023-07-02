import React, { useState, useEffect } from 'react';
import { useTheme, Grid, Button } from '@mui/material';
import useAuth from 'hooks/useAuth';

// project imports
import NewTrip from 'views/components/forms/NewTrip';
import MainCard from 'views/components/re-usable/MainCard';

const Dashboard = () => {
	const theme = useTheme();
	const { userSessionInfo: user, navigate, getAllTrips } = useAuth();

	const [allTrips, setAllTrips] = useState([]);
	const [recentEightTrips, setRecentEightTrips] = useState([]);

	const setUserTripData = async () => {
		await getAllTrips({ userID: user._id }).then((res) => {
			const { data } = res;
			setAllTrips(data.trips);
			if (data.trips.length > 8) {
				const storedTripLength = data.trips.length;
				let recentEightTrips = [];
				for (let i = storedTripLength - 8; i < storedTripLength; i++) {
					recentEightTrips.push(allTrips[i]);
				}
				setRecentEightTrips(recentEightTrips);
			}
		});
	};

	useEffect(() => {
		user && setUserTripData();
	}, []);

	const actionSection = (
		<Grid container>
			<Grid item>
				<Button>New Trip</Button>
			</Grid>
		</Grid>
	);

	return (
		<Grid container spacing={theme.spacing()}>
			<Grid item xs={12} sm={6} md={5} sx={{ margin: '1rem' }}>
				<MainCard title={`Upcoming Trips`} newItem='Trip'></MainCard>
			</Grid>
		</Grid>
	);
};

export default Dashboard;
