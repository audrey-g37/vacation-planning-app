import React, { useState, useEffect } from 'react';
import { Grid, useTheme } from '@mui/material';

// project imports
import DataGrid from 'views/components/data-grid';
import useAuth from 'hooks/useAuth';
import CircularLoader from 'views/components/CircularLoader';
import MainCard from 'views/components/MainCard';

const ViewAllTrips = ({ allTrips, actionSection, title = 'All Trips' }) => {
	const theme = useTheme();
	const { user, crudFunctions } = useAuth();

	const { getAllTrips } = crudFunctions;

	const dashboardView = window.location.pathname.includes('dashboard');

	const [allExistingTrips, setAllExistingTrips] = useState([]);
	const [loading, setLoading] = useState(false);

	const queryFunction = async () => {
		setLoading(true);
		await getAllTrips({ variables: { userID: user._id } }).then((res) => {
			const { data } = res;
			let tripData = [...data.trips];
			tripData = tripData.sort((a, b) => {
				const today = new Date(new Date()).valueOf();
				const startDateA = new Date(+a.startDate).valueOf();
				const startDateB = new Date(+b.startDate).valueOf();
				const closenessA = startDateA - today;
				const closenessB = startDateB - today;

				return startDateA && startDateB && closenessA > closenessB ? -1 : 1;
			});
			setAllExistingTrips(tripData);
		});
		setLoading(false);
	};

	const setUserTripData = async () => {
		if (allTrips) {
			setAllExistingTrips(allTrips);
		} else {
			await queryFunction();
		}
	};

	useEffect(() => {
		setUserTripData();
	}, [allTrips]);

	const columns = [
		{
			field: 'title',
			headerName: 'Title',
			width: 225,
			editable: false
		},
		{
			field: 'startDate',
			headerName: 'Starts',
			width: 150,
			editable: false,
			type: 'date'
		},
		{
			field: 'endDate',
			headerName: 'Ends',
			width: 150,
			editable: false,
			type: 'date'
		},
		{
			field: 'address',
			headerName: 'Location',
			width: 250,
			editable: false,
			format: {
				type: 'subField',
				subField: 'trip.address'
			}
		}
	];

	const rows = allExistingTrips;

	return (
		<>
			{loading && <CircularLoader />}

			<Grid container spacing={theme.spacing()}>
				<Grid item xs={12}>
					<MainCard
						title={title}
						collection={'trip'}
						newItem='Trip'
						actionSection={actionSection}
						queryResults={queryFunction}
					>
						<DataGrid
							rows={rows}
							columns={columns}
							editIcon={true}
							viewIcon={true}
							collection={'trip'}
							queryResults={queryFunction}
							hidePagination={dashboardView}
							maxHeight={!dashboardView ? '75vh' : '60vh'}
						/>
					</MainCard>
				</Grid>
			</Grid>
		</>
	);
};

export default ViewAllTrips;
