import React, { useState, useEffect } from 'react';
import { Grid, useTheme } from '@mui/material';

// project imports
import TableOfData from 'views/components/table';
import useAuth from 'hooks/useAuth';
import CircularLoader from 'views/components/CircularLoader';
import MainCard from 'views/components/MainCard';

const ViewAllTrips = ({ allTrips, actionSection, title = 'All Trips' }) => {
	const theme = useTheme();
	const { userSessionInfo: user, crudFunctions } = useAuth();

	const { getAllTrips } = crudFunctions;

	const dashboardView = window.location.pathname.includes('dashboard');

	const [allExistingTrips, setAllExistingTrips] = useState([]);
	const [loading, setLoading] = useState(true);

	const setUserTripData = async () => {
		if (allTrips) {
			setAllExistingTrips(allTrips);
		} else {
			await getAllTrips({ userID: user._id }).then((res) => {
				const { data } = res;
				setAllExistingTrips(data.trips);
			});
		}
		setLoading(false);
	};

	useEffect(() => {
		setUserTripData();
	}, [allTrips]);

	const columns = [
		{ id: 'title', label: 'Title', minWidth: 170 },
		{
			id: 'startDate',
			label: 'Starts',
			minWidth: 125,
			format: (value) => (value ? new Date(+value).toDateString() : '')
		},
		{
			id: 'endDate',
			label: 'Ends',
			minWidth: 125,
			format: (value) => (value ? new Date(+value).toDateString() : '')
		},
		{
			id: 'address',
			label: 'Location',
			minWidth: 170,
			format: (value) => `${value.city || ''} ${value.state || ''} ${value.country || ''}`
		}
	];

	const rows = allExistingTrips;

	return (
		<>
			{loading && <CircularLoader />}

			<Grid container spacing={theme.spacing()}>
				<Grid item xs={12} sx={{ margin: '6rem' }}>
					<MainCard
						title={title}
						collection={'trip'}
						newItem='Trip'
						actionSection={actionSection}
					>
						<TableOfData
							rows={rows}
							columns={columns}
							edit={true}
							collection={'trip'}
							showPagination={!dashboardView}
							maxTableHeight={!dashboardView ? '75vh' : '60vh'}
						/>
					</MainCard>
				</Grid>
			</Grid>
		</>
	);
};

export default ViewAllTrips;
