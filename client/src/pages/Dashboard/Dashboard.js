import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import "./Dashboard.css";
import { Table, Button, Row, Container} from "react-bootstrap";
import { QUERY_USER, QUERY_TRIPS } from "../../utils/queries";
import NewTrip from "../../components/NewTrip/NewTrip";

const Dashboard = () => {
const currentUser = Auth.getUsername();
const { data: data1 } = useQuery(QUERY_USER, {
  variables: { username : currentUser },
});
const userData = data1?.user || [];
// console.log(userData);
Auth.storeUserId(userData._id);

const { data: data2 } = useQuery(QUERY_TRIPS, { variables: {userId: userData._id }
});
const allTrips = data2?.trips || [];

let recentEightTrips = [];
const storedTripLength = allTrips.length
if (storedTripLength > 8) {
  for (let i=storedTripLength - 8; i<storedTripLength; i++) {
  recentEightTrips.push(allTrips[i])
  } }else {
    recentEightTrips.push(allTrips)
  }


  return (
    <div className="whole-dash">
      <h2 className="dash-title">Welcome {currentUser}!</h2>
      <div className="d-board">
        <div className="recent-trips">
      <h2>Recent Trips</h2>
       <Table className="trips-table" >
          <thead className="recent-trips-title">
            <tr className="recent-trips-table-header">
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
                  <td
                  >
                    {trip.location}
                  </td>
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
            <Button className="all-trips-button" variant="dark" type="submit" href="/view-trips">
              View More
            </Button>
            </div>
      <NewTrip />
      </div>
      </div>
  );
};

export default Dashboard;
