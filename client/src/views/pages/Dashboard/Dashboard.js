import React, { useState, useEffect } from 'react';
import { Table, Button } from '@mui/material';
import useAuth from 'hooks/useAuth';

// project imports
import NewTrip from 'views/components/forms/NewTrip';
import './Dashboard.css';

const Dashboard = () => {
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

	return (
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
	);
};

export default Dashboard;
