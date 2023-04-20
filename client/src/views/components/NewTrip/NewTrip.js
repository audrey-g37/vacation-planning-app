import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Button } from '@mui/material';
import { ADD_TRIP } from 'utils/apollo/mutations';
import { QUERY_USER } from 'utils/apollo/queries';
import './NewTrip.css';
import useAuth from 'hooks/useAuth';

const NewTrip = () => {
	const { user } = useAuth();
	const { data: data1 } = useQuery(QUERY_USER, {
		variables: { username: user }
	});
	const userData = data1?.user || [];

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const [addTrip, { error }] = useMutation(ADD_TRIP);

	const handleInputChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;

		if (name === 'title') {
			setTitle(value);
		} else if (name === 'description') {
			setDescription(value);
		} else if (name === 'location') {
			setLocation(value);
		} else if (name === 'startDate') {
			setStartDate(value);
		} else if (name === 'endDate') {
			setEndDate(value);
		}
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		const userId = userData._id;
		addTrip({
			variables: {
				title: title,
				description: description,
				location: location,
				startDate: startDate,
				endDate: endDate,
				userId: userId
			}
		}).then((data) => {
			// console.log(data);
			setTitle('');
			setLocation('');
			setStartDate('');
			setEndDate('');
			setDescription('');
		});
		window.location.reload();
	};
	return (
		<form className='add-trip-form'>
			{/* <h2>Add a New Trip:</h2>
			<Form.Group className='mb-3' controlId='name'>
				<Form.Label>Title*</Form.Label>
				<Form.Control type='text' name='title' value={title} onChange={handleInputChange} />
			</Form.Group>
			<Form.Group className='mb-3' controlId='name'>
				<Form.Label>Location*</Form.Label>
				<Form.Control
					type='text'
					name='location'
					value={location}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group className='mb-3' controlId='name'>
				<Form.Label>Start Date*</Form.Label>
				<Form.Control
					type='date'
					name='startDate'
					value={startDate}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group className='mb-3' controlId='name'>
				<Form.Label>End Date*</Form.Label>
				<Form.Control
					type='date'
					name='endDate'
					value={endDate}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group className='mb-3' controlId='name'>
				<Form.Label> Trip Description</Form.Label>
				<Form.Control
					type='text'
					name='description'
					value={description}
					onChange={handleInputChange}
				/>
			</Form.Group>
			{Auth.isLoggedIn() && (
				<Button
					className='add-trip-button'
					variant='dark'
					onClick={handleFormSubmit}
					type='submit'
				>
					Save
				</Button>
			)} */}
		</form>
	);
};

export default NewTrip;
