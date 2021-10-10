import React from "react";
import { Link } from "react-router-dom";

import "./ViewAllTrips.css";
import { Container, Row, Col } from "react-bootstrap";

import moment from "moment";

import { useQuery } from "@apollo/client";
import { QUERY_TRIPS } from "../../utils/queries";

const ViewAllTrips = () => {
  const now = moment();

  const { loading, data } = useQuery(QUERY_TRIPS);
  const allTrips = data?.trips || [];

  console.log(allTrips);
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
    <Container fluid className="all-trips">
      <Row>
        <h1>All Stored Trips</h1>
        <ul className="list-of-trips">
          {allTrips.length > 0 ? (
            allTrips.map((trip) => (
              <li className="trip-title">
                {trip.title}
                <Link to={`view-trip/${trip._id}`}>View Trip Details</Link>
              </li>
            ))
          ) : (
            <h4> No trips created yet! </h4>
          )}
        </ul>
      </Row>
    </Container>
  );
};

export default ViewAllTrips;
