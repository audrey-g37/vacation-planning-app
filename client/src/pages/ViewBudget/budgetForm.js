import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useParams } from "react-router";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { ADD_BUDGET } from "../../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_BUDGETS } from "../../utils/queries";

const BudgetForm = ({ allExpenses }) => {
  const tripIdVar = useParams();
  const idToUse = tripIdVar.id;

  const [addBudget, { error }] = useMutation(ADD_BUDGET);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchasedBy, setPurchasedBy] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "value") {
      let currentValue = value;
      currentValue = parseFloat(currentValue);
      setValue(currentValue);
    } else if (name === "purchaseDate") {
      setPurchaseDate(value);
    } else {
      setPurchasedBy(value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addBudget({
      variables: {
        tripId: idToUse,
        title: title,
        value: value,
        purchaseDate: purchaseDate,
        purchasedBy: purchasedBy,
      },
    }).then((data) => {
     console.log(data);
      setTitle("");
      setValue("");
      setPurchaseDate("");
      setPurchasedBy("");
    });
  };

  return (
    <>
      <Form className="budget-form-1">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Expense</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
            placeholder="Expense Name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
            Amount
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <FormControl
              id="inlineFormInputGroupUsername"
              placeholder="Amount"
              type="text"
              name="value"
              value={value}
              onChange={handleInputChange}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Purchased Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="MM/DD/YYYY"
            name="purchaseDate"
            value={purchaseDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Purchased By</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="purchasedBy"
            value={purchasedBy}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="dark" onClick={handleFormSubmit}>
          Add New Expense
        </Button>
      </Form>
    </>
  );
};

export default BudgetForm;
