import React from "react";
import { Link } from "react-router-dom";
import "./ViewSingleTrip.css";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { QUERY_TRIP } from "../../utils/queries";
import { Container, Card } from "react-bootstrap";

const ViewSingleTrip = () => {
  const tripIdVar = useParams();
  const idToUse = tripIdVar.id;

  const { data } = useQuery(QUERY_TRIP, {
    variables: { tripId: idToUse },
  });
  const tripData = data?.trip || [];

  console.log(tripData);

  return (
    <Container fluid className="single-trip">
      <Card>
        <Card.Body className="single-trip-details">
          <Card.Title>{tripData.title}</Card.Title>
          <li className="trip-location">Location: {tripData.location}</li>
          <li className="trip-start">Trip starts on: {tripData.startDate}</li>
          <li className="trip-end">Trip ends on: {tripData.endDate}</li>
          <li className="trip-details">{tripData.details}</li>
          {tripData.tasks ? (
            <li>
              <Link to={`/${tripData._id}/view-tasks`}>
                Click to view tasks for this trip!
              </Link>
            </li>
          ) : (
            <h4>No Tasks have been created for this trip yet!</h4>
          )}
          {tripData.budget ? (
            <li>
              <Link to={`/${tripData._id}/view-budget`}>
                Click to view the budget items for this trip!
              </Link>
            </li>
          ) : (
            <h4>No expenditures have been stored for this trip yet!</h4>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewSingleTrip;
