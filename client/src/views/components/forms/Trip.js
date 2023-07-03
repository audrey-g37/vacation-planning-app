import React, { useState } from 'react';
import { Button } from '@mui/material';

import { useQuery, useMutation } from '@apollo/client';
import { ADD_TRIP } from 'utils/apollo/mutations';
import { QUERY_USER } from 'utils/apollo/queries';
import useAuth from 'hooks/useAuth';

const TripForm = ({ edit }) => {
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
	return <p>{edit ? 'Edit' : 'New'} Trip Form</p>;
};

export default TripForm;
