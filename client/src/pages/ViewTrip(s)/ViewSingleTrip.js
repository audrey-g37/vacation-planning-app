import React from "react";
import { Link } from "react-router-dom";
import "./ViewSingleTrip.css";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { QUERY_TRIP } from "../../utils/queries";
import { Container, Card, Button } from "react-bootstrap";
import AuthService from "../../utils/auth";

const ViewSingleTrip = () => {
  const tripIdVar = useParams();
  const idToUse = tripIdVar.id;

  const { data } = useQuery(QUERY_TRIP, {
    variables: { tripId: idToUse },
  });
  const tripData = data?.trip || [];

  AuthService.storeTripId(idToUse);

  console.log(tripData);

  return (
    <main className="Hero">
      <Container fluid className="single-trip">
        <Card className="text-center">
          <Card.Header className="header">{tripData.title}</Card.Header>
          <Card.Body>
            <Card.Title>Location: {tripData.location}</Card.Title>
            <Card.Text>
              <li className="details">Trip starts on: {tripData.startDate}</li>
              <li className="details">Trip ends on: {tripData.endDate}</li>
              <li className="details">{tripData.details}</li>
            </Card.Text>
            {tripData.tasks ? (
              
                <Link className="link" to={`/${tripData._id}/view-tasks`}>
                  <Button variant="outline-dark" className="btn">
                  Click to view tasks for this trip!
               
              </Button>
               </Link>
            ) : (
              <h4>No Tasks have been created for this trip yet!</h4>
            )}
            {tripData.budget ? (
             
                <Link className="link" to={`/${tripData._id}/view-budget`}>
                   <Button variant="outline-dark" className="btn">
                  Click to view the budget items for this trip!
                  </Button>
                </Link>
          
            ) : (
              <h4>No expenditures have been stored for this trip yet!</h4>
            )}
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
};

export default ViewSingleTrip;
