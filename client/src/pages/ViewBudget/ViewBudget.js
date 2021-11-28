import React, { useState } from "react";
import { useParams } from "react-router";
import "./ViewBudget.css";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_BUDGETS } from "../../utils/queries";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BudgetForm from "./budgetForm";
import { REMOVE_BUDGET } from "../../utils/mutations";
import AuthService from "../../utils/auth";
import { Link } from "react-router-dom";


const ViewBudget = () => {
  // JS
  const { loading, data } = useQuery(QUERY_BUDGETS);
  const allExpenses = data?.budgets || [];
  // console.log(allExpenses);

  const tripIdVar = useParams();
  const idToUse = tripIdVar.id;

  const [removeBudget, { error }] = useMutation(REMOVE_BUDGET);
  const tripIdToRemove = AuthService.getTripId();

const spending = allExpenses.map((expense)=> {
  return parseInt(expense.value)
});
// console.log(spending)


const sumBudget = (array) => {
  let total =0;
   for (let i=0; i<array.length; i++) {
    total += array[i];
    // console.log(total)
  }
   return total}
   
   let weSpent = sumBudget(spending)

  //  console.log(weSpent)


  const assignBudget = async (event) => {
    event.preventDefault();
    const { value } = event.target;
    // console.log(value);
    await removeBudget({
      variables: {
        tripId: tripIdToRemove,
        budgetId: value,
      },
    }).then((data) => {
      // console.log(data);
      window.location.reload();
    });
  };

  return (
    <main className="budget">
      <Container>
      <Link className="link" to={`/view-trip/${idToUse}`}>
                   <Button variant="outline-dark" className="btn">
                  Back to Trip Details
                  </Button>
                </Link>
        <Row xs={1} md={2}>
          <Col className="current-expenses">
            <h2>Trip Expenses</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Expense Name</th>
                  <th>Amount</th>
                  <th>Purchased Date</th>
                  <th>Purchased By</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allExpenses.length > 0 ? (
                  allExpenses.map((budget) => (
                    <tr >
                      <td>{budget.title}</td>
                      <td>${budget.value}</td>
                      <td>{budget.purchaseDate}</td>
                      <td>{budget.purchasedBy}</td>
                      <td >
                        {" "}
                        <Button
                        value={budget._id}
                          id="delete-button"
                          variant="danger"
                          className="tashbtn"
                          onClick={assignBudget}
                        >X
                          {/* <BsTrashFill /> */}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </Table>
            <h4>Trip Total: ${weSpent}</h4>
          </Col>
          <Col>
            <>
              <h2>Add A New Expense</h2>
              <BudgetForm />
            </>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ViewBudget;
