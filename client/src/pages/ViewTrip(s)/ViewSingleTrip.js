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
    <main className="single-task">
      <section className="single-trip">
        <Card className="text-center">
          <h1 className="header">{tripData.title}</h1>
          <Card.Body>
            <Card.Title>Location: {tripData.location}</Card.Title>
            <Card.Text>
              <li className="details">Trip starts on: {tripData.startDate}</li>
              <li className="details">Trip ends on: {tripData.endDate}</li>
              <li className="details">{tripData.details}</li>
            </Card.Text>
            {tripData.tasks ? (
              
                <Link className="link" to={`/${tripData._id}/view-tasks`}>
                  <Button variant="dark" className="button">
                  Trip Tasks
               
              </Button>
               </Link>
            ) : (
              <h4>No Tasks have been created for this trip yet!</h4>
            )}
            {tripData.budget ? (
             
                <Link className="link" to={`/${tripData._id}/view-budget`}>
                   <Button variant="dark" className="button">
                  Budget Items
                  </Button>
                </Link>
          
            ) : (
              <h4>No expenditures have been stored for this trip yet!</h4>
            )}
          </Card.Body>
        </Card>
      </section>
    </main>
  );
};

export default ViewSingleTrip;
