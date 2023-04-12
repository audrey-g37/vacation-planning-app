import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import AuthService from 'utils/auth';
import { QUERY_TASK } from 'utils/queries';
import { UPDATE_TASK } from 'utils/mutations';
// import moment from "moment";
import { Card, Button } from '@mui/material';
import './updateTask.css';

const EditTask = () => {
	const taskIdVar = useParams();
	const taskIdToUse = taskIdVar.id;
	//   console.log(taskIdToUse);

	const TripIdToUse = AuthService.getTripId();

	//   console.log(taskData);

	const { loading, data } = useQuery(QUERY_TASK, {
		variables: { taskId: taskIdToUse }
	});

	const taskData = data?.task || [];

	const [title, setTitle] = useState(taskData.title);
	const [details, setDetails] = useState(taskData.details);
	const [dueDate, setDueDate] = useState(taskData.dueDate);
	const [assignee, setAssignee] = useState(taskData.assignee);
	const [status, setStatus] = useState(taskData.status);
	const checkboxEl = document.getElementById('assign-checkbox');

	const [updateTask] = useMutation(UPDATE_TASK);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		if (name === 'title') {
			setTitle(value);
		} else if (name === 'details') {
			setDetails(value);
		} else if (name === 'dueDate') {
			setDueDate(value);
		} else if (name === 'assignee') {
			setAssignee(value);
		} else {
			if (taskData.status === true) {
				setStatus(false);
			} else {
				setStatus(true);
			}
		}
	};

	const handleFormSubmit = (event) => {
		updateTask({
			variables: {
				tripId: TripIdToUse,
				taskId: taskData._id,
				title: title,
				details: details,
				dueDate: dueDate,
				status: status,
				assignee: assignee
			}
		}).then((data) => {
			// console.log(data);
			window.location.replace(`/${TripIdToUse}/view-tasks`);
		});
	};

	return (
		<section>
			<Card className='current-task text-center'>
				<Card.Header className='task-card-header'>Current Task Details</Card.Header>
				<Card.Body>
					<Card.Title className='current-task-title'>Title: {taskData.title}</Card.Title>
					<Card.Title className='task-list-items completion'>
						Status: {taskData.status === true ? 'Completed' : 'Incomplete'}
					</Card.Title>
					<Card.Text className='task-list-items'>
						<li>Due On: {taskData.dueDate}</li>
						<li>Assigned To: {taskData.assignee}</li>
						{taskData.details ? <li>Details: {taskData.details}</li> : ''}
					</Card.Text>
				</Card.Body>
			</Card>
			<div className='edit-task-form'>
				<form className='task-mutation'>
					<h2 className='edit-task-text'>Edit Task Below:</h2>
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
						<Form.Label>Due Date:</Form.Label>
						<Form.Control
							className='task-mutation-input'
							type='date'
							name='dueDate'
							value={dueDate}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group className='mb-3 completion'>
						{taskData.status == true ? (
							<Form.Check
								id='assign-checkbox'
								type='checkbox'
								name='status'
								label='Task is incomplete!'
								onChange={handleInputChange}
							></Form.Check>
						) : (
							<Form.Check
								id='assign-checkbox'
								type='checkbox'
								name='status'
								label='Task has been completed!'
								onChange={handleInputChange}
							></Form.Check>
						)}
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Assignee:</Form.Label>
						<Form.Control
							className='task-mutation-input'
							type='text'
							name='assignee'
							value={assignee}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Details:</Form.Label>
						<Form.Control
							className='task-mutation-input'
							type='text'
							name='details'
							value={details}
							onChange={handleInputChange}
						/>
					</Form.Group> */}
					<Button className='add-trip-button' variant='dark' onClick={handleFormSubmit}>
						Save Edits
					</Button>
				</form>
			</div>
		</section>
	);
};

export default EditTask;
