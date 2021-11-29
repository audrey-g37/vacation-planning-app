import React from "react";
import { Link } from "react-router-dom";
import "./ViewSingleTrip.css";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { QUERY_TRIP, QUERY_USER } from "../../utils/queries";
import { Container, Card, Button } from "react-bootstrap";
import Auth from "../../utils/auth";

const ViewSingleTrip = () => {
  const tripId = useParams();
  const idToUse = tripId.id;
  Auth.storeTripId(idToUse);

  const userId = Auth.getUserId();

  const { data } = useQuery(QUERY_TRIP, {
    variables: { tripId: idToUse, userId: userId },
  });
  const tripData = data?.trip || [];

  // console.log(tripData);

  return (
    <main className="single-trip-whole">
      <section className="single-trip">
        <Card className="text-center">
          <h1 className="header">{tripData.title}</h1>
          <h5 className="details">{tripData.description}</h5>
          <Card.Body>
            <Card.Title>Location: {tripData.location}</Card.Title>
            <Card.Text>
              <li className="details">Trip starts on: {tripData.startDate}</li>
              <li className="details">Trip ends on: {tripData.endDate}</li>
            </Card.Text>
            {tripData.tasks ? (
                <Link className="link" to={`/${tripData._id}/view-tasks`}>
                  <Button variant="dark" className="single-trip-btn button">
                  Task Items
              </Button>
               </Link>
            ) : (
              <h4>No Tasks have been created for this trip yet!</h4>
            )}
            {tripData.budget ? (
                <Link className="link" to={`/${tripData._id}/view-budget`}>
                   <Button variant="dark" className="single-trip-btn button">
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
