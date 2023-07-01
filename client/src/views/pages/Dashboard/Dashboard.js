import React, { useEffect } from 'react';
import NewTrip from 'views/components/NewTrip/NewTrip.js';
import { Table, Button } from '@mui/material';
import './Dashboard.css';
import useAuth from 'hooks/useAuth.js';

const Dashboard = () => {
	const { user, navigate } = useAuth();

	const allTrips = [];

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
		user && (
			<div className='whole-dash'>
				<h2 className='dash-title'>Welcome {user.firstName}!</h2>
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
							onClick={() => navigate('/view-trips')}
						>
							View All
						</Button>
					</div>
					<NewTrip />
				</div>
			</div>
		)
	);
};

export default Dashboard;
