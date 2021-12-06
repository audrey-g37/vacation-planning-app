import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import AuthService from "../../utils/auth";
import { QUERY_BUDGET } from "../../utils/queries";
import { UPDATE_BUDGET } from "../../utils/mutations";
// import moment from "moment";
import { Card, Button, Form } from "react-bootstrap";
import "./updateBudget.css"

const EditBudget = () => {
  const budgetIdVar = useParams();
  const budgetIdToUse = budgetIdVar.id;
//   console.log(taskIdToUse);

  const TripIdToUse = AuthService.getTripId();


const { loading, data } = useQuery(QUERY_BUDGET, {
  variables: {budgetId: budgetIdToUse}
});

const budgetData = data?.budget || [];
console.log(budgetData);

  const [title, setTitle] = useState(budgetData.title);
  const [cost, setCost] = useState(JSON.stringify(budgetData.value));
  const [purchaseDate, setPurchaseDate] = useState(budgetData.purchaseDate);
  const [purchasedBy, setPurchasedBy] = useState(budgetData.purchasedBy);

  const [updateBudget] = useMutation(UPDATE_BUDGET);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log([title, cost, purchasedBy, purchaseDate, TripIdToUse, budgetData._id])
    if (name === "title") {
      setTitle(value);
    } else if (name === "cost") {
      setCost(parseInt(value));
    } else if (name === "purchaseDate") {
      setPurchaseDate(value);
    } else {
      setPurchasedBy(value);
    }
  };

  const handleFormSubmit = (event) => {
    updateBudget({
      variables: {
        tripId: TripIdToUse,
        budgetId: budgetData._id,
        title: title,
        value: cost,
        purchaseDate: purchaseDate,
        purchasedBy: purchasedBy,
      },
    }).then((data) => {
        // console.log(data)
      window.location.replace(`/${TripIdToUse}/view-budget`);
    });
  };

  return (
    <section>
            <Card className = "current-task text-center">
            <Card.Header className="task-card-header">Current Budget Details</Card.Header>
            <Card.Body>
                <Card.Title className="current-task-title">Title: {budgetData.title}</Card.Title>
                <Card.Title className="task-list-items completion">Cost: ${budgetData.value}</Card.Title>
                <Card.Text className ="task-list-items">
                    <li>Purchased On: {budgetData.purchaseDate}</li>
                    <li>By: {budgetData.purchasedBy}</li>
                </Card.Text>
            </Card.Body>
            </Card>
      <div className = "edit-task-form">
      <Form className = "task-mutation">
        <h2 className="edit-task-text">Edit Budget Below:</h2>
        <Form.Group className="mb-3">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            className = "task-mutation-input"
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Amount Spent:</Form.Label>
          <Form.Control
           className = "task-mutation-input"
            type="text"
            name="cost"
            value={cost}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Purchase Date:</Form.Label>
          <Form.Control
            type="date"
            name="purchaseDate"
            value={purchaseDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Purchased By:</Form.Label>
          <Form.Control
           className = "task-mutation-input"
            type="text"
            name="purhasedBy"
            value={purchasedBy}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button
        className="save-edits-btn"
          variant="dark"
          onClick={handleFormSubmit}
        >
          Save Edits
        </Button>
      </Form>
      </div>
  </section>
  );
};

export default EditBudget;
