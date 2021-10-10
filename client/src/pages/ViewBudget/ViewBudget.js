import React from "react";
import "./ViewBudget.css";
import { useQuery } from "@apollo/client";
import {  QUERY_BUDGETS } from "../../utils/queries";
import Table from 'react-bootstrap/Table'
import { BsTrashFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BudgetForm from "./budgetForm";

const ViewBudget = () => {
  // JS 
  const {loading, data} = useQuery(QUERY_BUDGETS);
  const allExpenses = data?.budgets || []
  console.log(allExpenses)

  return (
    <main className="budget-form-1">
      <Container>
      <Row xs={1} md={2}>
        <Col>
        <h2>Trip Expenses</h2>
      <Table striped bordered hover>
  <thead>
    <tr>
      <th>Expense Name</th>
      <th>Amount</th>
      <th>Purchased Date</th>
      <th>Purchased By</th>
    </tr>
  </thead>
  <tbody>
    {allExpenses.length > 0 ? (
    allExpenses.map((budget) => (
      <tr>
      <td>{budget.title}</td>
      <td>${budget.value}</td>
      <td>{budget.purchaseDate}</td>
      <td>{budget.purchasedBy}</td>
      <td>
        {" "}
        <Button variant="outline-danger" className="tashbtn">
          <BsTrashFill/>
          {/* logic for delete */}
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
<p>Trip Total:</p>
</Col>
<Col>
<>
 <h2>Add A New Expense</h2>
 <BudgetForm/>
  
</>
</Col>
</Row>
</Container>



    </main>
  )
};

export default ViewBudget;

