import React from "react";
import "./ViewAllTrips.css";
import { Container, Row, Col} from "react-bootstrap"

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_USERS, QUERY_TRIP, QUERY_TRIPS, QUERY_TASK, QUERY_TASKS, QUERY_BUDGET, QUERY_BUDGETS } from '../../utils/queries';

const ViewAllTrips = () => {

const {data} = useQuery(QUERY_TRIPS);
const allTrips = data?.trips || [];
console.log (allTrips);

// const singleTripData = useQuery(QUERY_TRIP);
// const singleTrip = singleTripData?.trip || [];
// console.log (singleTrip);

// const allTaskData = useQuery(QUERY_TASKS);
// const allTasks= allTaskData?.tasks || [];
// console.log (allTasks);

// const singleTaskData = useQuery(QUERY_TASK);
// const singleTask = singleTaskData?.task|| [];
// console.log (singleTask);





// const {loading, data} = useQuery(QUERY_TRIPS);

// const trips = data?.trips || [];

// console.log (trips);


  return (
  <>
 <Container fluid className= "all-trips">
  <Row>
    <h1>All Stored Trips</h1>
    <ul className= "list-of-trips">
    <li className= "trip-title">
      <a>Trip 1</a>
      </li>
    <li className= "trip-title">Trip 2</li>
    </ul>
  </Row>
</Container>
    </>)
};

export default ViewAllTrips;
