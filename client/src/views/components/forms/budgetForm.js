import { useState } from 'react';
import { Button } from '@mui/material';

import { useMutation } from '@apollo/client';
import { ADD_BUDGET } from 'utils/apollo/mutations';
import useAuth from 'hooks/useAuth';

const BudgetForm = () => {
	const { tripId } = useAuth();
	const [title, setTitle] = useState('');
	const [cost, setCost] = useState('');
	const [purchaseDate, setPurchaseDate] = useState('');
	const [purchasedBy, setPurchasedBy] = useState('');

	const handleInputChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		if (name === 'title') {
			setTitle(value);
		} else if (name === 'cost') {
			setCost(parseInt(value));
		} else if (name === 'purchaseDate') {
			setPurchaseDate(value);
		} else {
			setPurchasedBy(value);
		}
		// console.log({title, cost, purchaseDate, purchasedBy})
	};

	const [addBudget, { error }] = useMutation(ADD_BUDGET);

	const handleFormSubmit = (event) => {
		event.preventDefault();
		addBudget({
			variables: {
				title: title,
				value: cost,
				purchaseDate: purchaseDate,
				purchasedBy: purchasedBy,
				tripId: tripId
			}
		}).then((data) => {
			//  console.log(data);
			setTitle('');
			setCost('');
			setPurchaseDate('');
			setPurchasedBy('');
		});
		window.location.reload();
	};

	return (
		<div className='add-task'>
			<form>
				<h3>Add a New Expense</h3>
				{/* <Form.Group className='mb-3'>
					<Form.Label>Expense Title*</Form.Label>
					<Form.Control
						type='text'
						name='title'
						value={title}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Amount Spent (dollars)*</Form.Label>
					<FormControl
						type='text'
						name='cost'
						value={cost}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>Purchased Date*</Form.Label>
					<Form.Control
						type='date'
						name='purchaseDate'
						value={purchaseDate}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>Purchased By (name)*</Form.Label>
					<Form.Control
						type='text'
						name='purchasedBy'
						value={purchasedBy}
						onChange={handleInputChange}
					/>
				</Form.Group> */}
				<Button variant='dark' onClick={handleFormSubmit}>
					Add New Expense
				</Button>
			</form>
		</div>
	);
};

export default BudgetForm;
