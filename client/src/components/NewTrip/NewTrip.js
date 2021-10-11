import React, { useState } from "react";
import "./NewTrip.css";
import { useQuery, useMutation } from "@apollo/client";
import { Form, Button } from "react-bootstrap";
import { ADD_TRIP } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { QUERY_USER } from "../../utils/queries";

const NewTrip = () => {
  const currentUser = Auth.getUsername();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: currentUser },
  });
  const userData = data?.user || [];

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
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addTrip({
      variables: {
        userId: userData._id,
        title: title,
        description: description,
        location: location,
        startDate: startDate,
        endDate: endDate,
      },
    }).then((data) => {
      console.log(data);
      setTitle("");
      setLocation("");
      setStartDate("");
      setEndDate("");
      setDescription("");
    });
  };
  return (
    <Form className="add-trip-form">
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
  );
};

export default NewTrip;
