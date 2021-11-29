import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

import "./ViewAllTrips.css";
import { Container, Row, Col,Button } from "react-bootstrap";

import { useQuery } from "@apollo/client";
import { QUERY_TRIPS } from "../../utils/queries";

// import moment from "moment";

const ViewAllTrips = () => {
  // const now = moment();
const userId = Auth.getUserId()
  const { data: data2 } = useQuery(QUERY_TRIPS, { variables: {userId: userId }
  });
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
    <body fluid className="all-trips">
      <Row>
        <h1>All Stored Trips</h1>
        <ul className="list-of-trips">
          {allTrips.length > 0 ? (
            allTrips.map((trip) => (
              <li className="trip">
                {trip.title}
                <div className="view-details">
                <Link  className="link" to={`view-trip/${trip._id}`}>
                <Button variant="dark" size="small" className="button">
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
      </Row>
    </body>
  );
};

export default ViewAllTrips;
