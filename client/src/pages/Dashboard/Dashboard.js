import React from "react";
import { useParams, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "./Dashboard.css";
import { Table, Form, Button } from "react-bootstrap";
import { QUERY_TRIP, QUERY_TRIPS } from "../../utils/queries";
// import Auth from '../utils/auth';

const Dashboard = () => {
  // const { userId } = useParams();
  // const { loading, data } = useQuery(QUERY_TRIP);
  // const trip = data?.trips || [];

  const { loading, data } = useQuery(QUERY_TRIPS);
  const allTrips = data?.trips || [];

  console.log(allTrips);

  return (
    <>
      <div className="dashboard">
        <Table className="Table" responsive>
          <thead>
            <tr>
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
          </tbody>
        </Table>

        <Form>
          <h2>New Trip Details</h2>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Title*</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Location*</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Start Date*</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>End Date*</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Trip Description*</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Trip
          </Button>

          <Button variant="primary" type="submit">
            View Trips
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Dashboard;
