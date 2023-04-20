import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_TRIPS } from 'utils/apollo/queries';
import NewTrip from 'views/components/NewTrip/NewTrip';
import { Table, Button } from '@mui/material';
import './Dashboard.css';
import useAuth from 'hooks/useAuth';

const Dashboard = () => {
	const { user } = useAuth();
	const { data: data1 } = useQuery(QUERY_USER, {
		variables: { username: user }
	});
	const userData = data1?.user || [];
	// console.log(userData);

	const { data: data2 } = useQuery(QUERY_TRIPS, { variables: { userId: userData._id } });
	const allTrips = data2?.trips || [];

	let recentEightTrips;
	const storedTripLength = allTrips.length;
	if (storedTripLength > 8) {
		recentEightTrips = [];
		for (let i = storedTripLength - 8; i < storedTripLength; i++) {
			recentEightTrips.push(allTrips[i]);
		}
	} else {
		recentEightTrips = allTrips;
	}
	return (
		<div className='whole-dash'>
			<h2 className='dash-title'>Welcome {user}!</h2>
			<div className='d-board'>
				<div className='recent-trips'>
					<h2>Recent Trips</h2>
					<Table className='trips-table'>
						<thead className='recent-trips-title'>
							<tr className='recent-trips-table-header'>
								<th>Title</th>
								<th>Location</th>
								<th>Start Date</th>
								<th>End Date</th>
							</tr>
						</thead>
						<tbody>
							{recentEightTrips.length > 0 ? (
								recentEightTrips.map((trip) => (
									<tr>
										<td>{trip.title}</td>
										<td>{trip.location}</td>
										<td>{trip.startDate}</td>
										<td>{trip.endDate}</td>
									</tr>
								))
							) : (
								<tr>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							)}
						</tbody>
					</Table>
					<Button
						className='all-trips-button'
						variant='dark'
						type='submit'
						href='/view-trips'
					>
						View All
					</Button>
				</div>
				<NewTrip />
			</div>
		</div>
	);
};

export default Dashboard;
