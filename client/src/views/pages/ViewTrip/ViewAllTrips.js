import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

// project imports
import TableOfData from 'views/components/table';
import useAuth from 'hooks/useAuth';
import './ViewAllTrips.css';

const ViewAllTrips = ({ allTrips }) => {
	const { userSessionInfo: user, getAllTrips } = useAuth();

	const [allExistingTrips, setAllExistingTrips] = useState([]);

	const setUserTripData = async () => {
		await getAllTrips({ userID: user._id }).then((res) => {
			const { data } = res;
			setAllExistingTrips(data.trips);
			if (data.trips.length > 8) {
				const storedTripLength = data.trips.length;
				let recentEightTrips = [];
				for (let i = storedTripLength - 8; i < storedTripLength; i++) {
					recentEightTrips.push(allTrips[i]);
				}
			}
		});
	};

	useEffect(() => {
		!allTrips ? setUserTripData() : setAllExistingTrips(allTrips);
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

	return <TableOfData rows={rows} columns={columns} edit={true} showPagination={false} />;
};

export default ViewAllTrips;
