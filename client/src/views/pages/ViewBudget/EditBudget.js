import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Card, Button, Form } from '@mui/material';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_BUDGET } from 'utils/apollo/queries.js';
import { UPDATE_BUDGET } from 'utils/apollo/mutations.js';
// import moment from "moment";
import './updateBudget.css';
import useAuth from 'hooks/useAuth.js';

const EditBudget = () => {
	const budgetIdVar = useParams();
	const budgetIdToUse = budgetIdVar.id;
	//   console.log(taskIdToUse);

	const { tripId } = useAuth();

	const { loading, data } = useQuery(QUERY_BUDGET, {
		variables: { budgetId: budgetIdToUse }
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
		console.log([title, cost, purchasedBy, purchaseDate, tripId, budgetData._id]);
		if (name === 'title') {
			setTitle(value);
		} else if (name === 'cost') {
			setCost(parseInt(value));
		} else if (name === 'purchaseDate') {
			setPurchaseDate(value);
		} else {
			setPurchasedBy(value);
		}
	};

	const handleFormSubmit = (event) => {
		updateBudget({
			variables: {
				tripId: tripId,
				budgetId: budgetData._id,
				title: title,
				value: cost,
				purchaseDate: purchaseDate,
				purchasedBy: purchasedBy
			}
		}).then((data) => {
			// console.log(data)
			window.location.replace(`/${tripId}/view-budget`);
		});
	};

	return (
		<section>
			<Card className='current-task text-center'>
				<Card.Header className='task-card-header'>Current Budget Details</Card.Header>
				<Card.Body>
					<Card.Title className='current-task-title'>
						Title: {budgetData.title}
					</Card.Title>
					<Card.Title className='task-list-items completion'>
						Cost: ${budgetData.value}
					</Card.Title>
					<Card.Text className='task-list-items'>
						<li>Purchased On: {budgetData.purchaseDate}</li>
						<li>By: {budgetData.purchasedBy}</li>
					</Card.Text>
				</Card.Body>
			</Card>
			<div className='edit-task-form'>
				<form className='task-mutation'>
					<h2 className='edit-task-text'>Edit Budget Below:</h2>
					{/* <Form.Group className='mb-3'>
						<Form.Label>Title:</Form.Label>
						<Form.Control
							className='task-mutation-input'
							type='text'
							name='title'
							value={title}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Amount Spent:</Form.Label>
						<Form.Control
							className='task-mutation-input'
							type='text'
							name='cost'
							value={cost}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Purchase Date:</Form.Label>
						<Form.Control
							type='date'
							name='purchaseDate'
							value={purchaseDate}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Purchased By:</Form.Label>
						<Form.Control
							className='task-mutation-input'
							type='text'
							name='purhasedBy'
							value={purchasedBy}
							onChange={handleInputChange}
						/>
					</Form.Group> */}
					<Button className='save-edits-btn' variant='dark' onClick={handleFormSubmit}>
						Save Edits
					</Button>
				</form>
			</div>
		</section>
	);
};

export default EditBudget;
