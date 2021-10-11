import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import "./Dashboard.css";
import { Table, Button, Row, Container} from "react-bootstrap";
import { QUERY_TRIP, QUERY_TRIPS } from "../../utils/queries";
import NewTrip from "../../components/NewTrip/NewTrip";

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_TRIPS);
  const allTrips = data?.trips || [];
  const currentUser = Auth.getUsername();

  console.log(allTrips);

  return (
    <div className="whole-dash">
      <h2 className="dash-title">Welcome {currentUser}!</h2>
      < div className="d-board">
       <Table className="recent-trips" >
          <thead className="recent-trips-title">
            <h2 >Recent Trips</h2>
            <tr className="recent-trips-table-header">
              <th>Title</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {allTrips.length > 0 ? (
              allTrips.map((trip, index) => (
                <tr>
                  <td>{trip.title}</td>
                  <td
                    ey={index}
                    // {{QUERY_TRIP}} {index}
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
            <Button className="all-trips-button" variant="dark" type="submit" href="/view-trips">
              View More
            </Button>{" "}
          </tbody>
        </Table>
      <NewTrip />
      </div>
      </div>
  );
};

export default Dashboard;
