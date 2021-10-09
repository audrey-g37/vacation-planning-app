import React from "react";
import "./ViewAllTrips.css";
import { Container, Row, Col} from "react-bootstrap"

import moment from "moment";

import { useQuery } from '@apollo/client';
import { QUERY_TRIPS} from '../../utils/queries';

const ViewAllTrips = () => {

moment().format();
const {loading, data} = useQuery(QUERY_TRIPS);
let allTrips = data?.trips || [];

allTrips = allTrips.map((trip)=> {

})

// allTrips.sort(function ())
console.log (allTrips);


  return (
 <Container fluid className= "all-trips">
  <Row>
    <h1>All Stored Trips</h1>
    <ul className= "list-of-trips">
      {/* {allTrips.length>0? allTrips.map((trip) => {

      })


      } */}
    <li className= "trip-title">
      <a>Trip 1</a>
      </li>
    <li className= "trip-title">Trip 2</li>
    </ul>
  </Row>
</Container>
)
};

export default ViewAllTrips;
