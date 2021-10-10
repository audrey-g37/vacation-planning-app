import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import "./Dashboard.css";
import { Table, Form, Button } from "react-bootstrap";
import { QUERY_TRIPS, QUERY_USER } from "../../utils/queries";
import { ADD_TRIP } from "../../utils/mutations";

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_TRIPS);
  const allTrips = data?.trips || [];

  // const currentUserId = Auth.getUsername();
  // const { data, loading } = useQuery(QUERY_USER, {
  //   variables: { username: currentUserId },
  // });
  // const userData = data?.user || [];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [addTrip, { error }] = useMutation(ADD_TRIP);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "location") {
      setLocation(value);
    } else if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
    console.log(title);
    console.log(location);
    console.log(startDate);
    console.log(endDate);
    console.log(description);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // addTrip({
    //   variables: {
    //     userId: userData._id,
    //     title: title,
    //     description: description,
    //     location: location,
    //     startDate: startDate,
    //     endDate: endDate,
    //   },
    // }).then((data) => {
    //   console.log(data);

    setTitle("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    // });
  };

  return (
    <div className="Home">
      <h2 className="Title">Welcome, Grip Member!</h2>
      <section className="Dashboard">
        <Table className="Table" responsive>
          <thead>
            <h2>Recent Trips</h2>
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
            <Button className="all-trips-button" variant="dark" type="submit">
              View More
            </Button>{" "}
          </tbody>
        </Table>

        <Form className="Form">
          <h2>New Trip Details</h2>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Title*</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Location*</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={location}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Start Date*</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={startDate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>End Date*</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={endDate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label> Trip Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={description}
              onChange={handleInputChange}
            />
          </Form.Group>
          {Auth.loggedIn() && (
            <Button
              className="add-trip-button"
              variant="dark"
              onClick={handleFormSubmit}
              type="submit"
            >
              Add New Trip
            </Button>
          )}
        </Form>
      </section>
    </div>
  );
};

export default Dashboard;
