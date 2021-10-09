import React from "react";
import "./ViewBudget.css";
import { useQuery } from "@apollo/client";
import { QUERY_BUDGET, QUERY_BUDGETS } from "../../utils/queries";
import Table from 'react-bootstrap/Table'
import { REMOVE_BUDGET, UPDATE_BUDGET, ADD_BUDGET } from "../../utils/mutations";
import { BsTrashFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'




const ViewBudget = () => {
  // JS 
  const {loading, data} = useQuery(QUERY_BUDGETS);
  const allExpenses = data?.budgets || []
  console.log(allExpenses)



  return (
    <main>
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
        <Button variant="outline-danger" class="tashbtn">
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
 <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Expense</Form.Label>
    <Form.Control type="email" placeholder="Expense Name" />
  </Form.Group>
  <Form.Group>
  <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
        Amount
      </Form.Label>
      <InputGroup>
        <InputGroup.Text>$</InputGroup.Text>
        <FormControl id="inlineFormInputGroupUsername" placeholder="Amount" />
      </InputGroup>
      </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Purchased Date</Form.Label>
    <Form.Control type="date" placeholder="MM/DD/YYYY" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Purchased By</Form.Label>
    <Form.Control type="input" placeholder="Name" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</>
</Col>
</Row>
</Container>



    </main>
  )
};

export default ViewBudget;

