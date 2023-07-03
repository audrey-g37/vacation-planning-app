import React, { useState, useEffect } from 'react';
import { useTheme, Grid, Button } from '@mui/material';
import useAuth from 'hooks/useAuth';

// project imports
import NewTrip from 'views/components/forms/NewTrip';
import MainCard from 'views/components/re-usable/MainCard';
import ViewAllTrips from '../ViewTrip/ViewAllTrips';
import CustomTypography from 'views/components/re-usable/CustomTypography';

const Dashboard = () => {
	const theme = useTheme();
	const { userSessionInfo: user, getAllTrips } = useAuth();

	const [allTrips, setAllTrips] = useState([]);

	const setUserTripData = async () => {
		await getAllTrips({ userID: user._id }).then((res) => {
			const { data } = res;
			let tripData = data.trips;
			tripData = tripData.reduce((prev, next) => {
				let existing = prev;
				const today = new Date(new Date()).valueOf();
				const startDate = new Date(+next.startDate).valueOf();
				if (!(startDate < today)) {
					existing.push(next);
				}
				return existing;
			}, []);

			tripData = tripData.sort((a, b) => {
				const today = new Date(new Date()).valueOf();
				const startDateA = new Date(+a.startDate).valueOf();
				const startDateB = new Date(+b.startDate).valueOf();
				const closenessA = startDateA - today;
				const closenessB = startDateB - today;

				return closenessA > closenessB ? 1 : -1;
			});
			tripData = tripData.splice(
				0,
				tripData.length > 5 ? tripData.length - (tripData.length - 5) : tripData.length
			);
			setAllTrips(tripData);
		});
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
	}, []);

	return (
		<ViewAllTrips allTrips={allTrips} actionSection={actionSection} title={'My Next 5 Trips'} />
	);
};

export default Dashboard;
