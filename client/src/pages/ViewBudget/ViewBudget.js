import React from "react";
import "./ViewBudget.css";
import { useQuery } from "@apollo/client";
import { QUERY_BUDGET, QUERY_BUDGETS } from "../../utils/queries";
import Table from 'react-bootstrap/Table'
import { REMOVE_BUDGET, UPDATE_BUDGET, ADD_BUDGET } from "../../utils/mutations";



const ViewBudget = () => {
  // JS 
  const {loading, data} = useQuery(QUERY_BUDGETS);
  const allExpenses = data?.budgets || []
  console.log(allExpenses)



  return (
    <main>
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
      <td>{budget.value}</td>
      <td>{budget.purchaseDate}</td>
      <td>{budget.purchasedBy}</td>
      <td>
        {" "}
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



    </main>
  )
};

export default ViewBudget;
