import React, { useState, useEffect } from 'react';
import { Grid, useTheme } from '@mui/material';

// project imports
import DataGrid from 'views/components/data-grid';
import useAuth from 'hooks/useAuth';
import CircularLoader from 'views/components/CircularLoader';
import MainCard from 'views/components/MainCard';
import { sortTrips } from 'utils/sorting';

const ViewAllTrips = ({ allTrips, actionSection, title = 'All Trips', dashboardSortingObj }) => {
	const theme = useTheme();
	const { user, crudFunctions } = useAuth();

	const { getAllTrips } = crudFunctions;

	const dashboardView = window.location.pathname.includes('dashboard');

	const [allExistingTrips, setAllExistingTrips] = useState([]);
	const [loading, setLoading] = useState(false);

	const queryFunction = async () => {
		setLoading(true);
		const { data } = await getAllTrips({ variables: { userID: user._id } });
		let tripSortingObj = {
			tripData: [...data.trips]
		};

		if (dashboardView) {
			tripSortingObj = {
				...tripSortingObj,
				...dashboardSortingObj
			};
		}

		const tripData = sortTrips(tripSortingObj);
		setAllExistingTrips(tripData);
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
			width: 175,
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
			width: 225,
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
							maxHeight={!dashboardView ? '70vh' : '45vh'}
						/>
					</MainCard>
				</Grid>
			</Grid>
		</>
	);
};

export default ViewAllTrips;
