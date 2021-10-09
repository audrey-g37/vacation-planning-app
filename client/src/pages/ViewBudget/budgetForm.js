import Button from 'react-bootstrap/Button'
import { useState } from 'react'

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import { ADD_BUDGET } from "../../utils/mutations";
import { useMutation } from '@apollo/client';

const BudgetForm = ({tripId}) => {
    const [budget, setbudget] = useState('')
    const [addBudget, {error}] = useMutation(ADD_BUDGET)

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        
        try {
            const data = await addBudget({
                variables: {tripId, budget}
            })
            addBudget('');
        }catch (err){
            console.log(err)
        }
    }

    return (
        <>
        <Form onSubmit={handleFormSubmit}>
 <Form.Group className="mb-3" controlId="formBasicEmail">
   <Form.Label>Expense</Form.Label>
   <Form.Control  type="email" placeholder="Expense Name" />
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

    )
}

export default BudgetForm