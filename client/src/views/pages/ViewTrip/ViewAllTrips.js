import React from 'react';
import { Link } from 'react-router-dom';
import Auth from 'utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_TRIPS } from 'utils/queries';
import { Button } from 'react-bootstrap';
import './ViewAllTrips.css';

// import moment from "moment";

const ViewAllTrips = () => {
	// const now = moment();
	const currentUser = Auth.getUsername();
	const { data: data1 } = useQuery(QUERY_USER, {
		variables: { username: currentUser }
	});
	const userData = data1?.user || [];
	const { data: data2 } = useQuery(QUERY_TRIPS, { variables: { userId: userData._id } });
	const allTrips = data2?.trips || [];
	// console.log(allTrips);
	// const tripDates = allTrips.map((trip) => {
	//   let date = trip.startDate;
	//   date = Date.parse((moment(date, "MMM, Do, YYYY").format("MM-DD-YYYY"))
	// )});

	// console.log (tripDates);

	// const sortedDates = tripDates.sort();

	// console.log(sortedDates)

	// const orderedDates = sortedDates.map((date) => {
	//   return date = moment(date).format("MM-DD-YYYY");
	// });

	// console.log (orderedDates);

	// const ogDatesIndex = tripDates.map((date, index)=> {
	// return index;
	// })

	// console.log(ogDatesIndex)

	// reformattedAllTrips = allTrips.map((trip), =>  {

	// });

	// const sortedTrips = allTrips.sort((a)=> {
	//   if (a.startDate> now) {
	//     return 1
	//   } else {
	//     return -1
	//   }
	// })

	// console.log(sortedTrips)

	return (
		<body id='all-trips-whole'>
			<h1>All Stored Trips</h1>
			<div className='all-trips'>
				<ul className='list-of-trips'>
					{allTrips.length > 0 ? (
						allTrips.map((trip) => (
							<li className='trip'>
								{trip.title}
								<div className='view-details'>
									<Link className='link' to={`view-trip/${trip._id}`}>
										<Button variant='dark' size='small' className='button'>
											Details
										</Button>
									</Link>
								</div>
							</li>
						))
					) : (
						<h4> No trips created yet! </h4>
					)}
				</ul>
			</div>
		</body>
	);
};

export default ViewAllTrips;
