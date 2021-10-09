import React from "react";
import "./ViewAllTrips.css";
import { Container, Row, Col} from "react-bootstrap"

import { useQuery } from '@apollo/client';
import { QUERY_TRIPS} from '../../utils/queries';

const ViewAllTrips = () => {
const {loading, data} = useQuery(QUERY_TRIPS);
const trips = data?.trips || [];
console.log (trips);


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
