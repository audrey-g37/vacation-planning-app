import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_TRIP, QUERY_TASKS, QUERY_USER } from 'utils/apollo/queries';
import { REMOVE_TASK, UPDATE_TASK } from 'utils/apollo/mutations';
import AddTask from './AddTask';
import { Table, Button } from '@mui/material';
import './ViewTask.css';
import useAuth from 'hooks/useAuth';

const ViewTask = () => {
	const { user, tripId } = useAuth();
	const { data: data1 } = useQuery(QUERY_USER, {
		variables: { username: user }
	});
	const userData = data1?.user || [];
	const { data: data2 } = useQuery(QUERY_TRIP, {
		variables: { tripId: tripId, userId: userData._id }
	});
	const tripData = data2?.trip || [];
	// console.log(tripData);

	const { loading, data } = useQuery(QUERY_TASKS, { variables: { tripId: tripId } });
	const allTasks = data?.tasks || [];
	// console.log(allTasks);

	const [removeTask, { error }] = useMutation(REMOVE_TASK);

	const viewEditTask = (event) => {
		event.preventDefault();
		const { value } = event.target;

		window.location.replace(`/${tripId}/view-tasks/${value}`);
	};

	const deleteTask = (event) => {
		event.preventDefault();
		const { value } = event.target;
		// console.log(value);
		// console.log(TripIdToUse);
		removeTask({
			variables: {
				tripId: tripId,
				taskId: value
			}
		}).then(() => {
			window.location.reload();
		});
	};

	return (
		<main className='task'>
			<Link to={`/view-trip/${tripId}`}>
				<Button id='back-to-trip-details'>Back to Trip Details</Button>
			</Link>
			<div id='task-info'>
				<h2 className='all-tasks-title'>Tasks: {tripData.title}</h2>
				<ul className='trip-details-list'>
					<li>Start Date: {tripData.startDate}</li>
					<li>End Date: {tripData.endDate}</li>
				</ul>
			</div>
			<div className='task-tables'>
				<div className='current-tasks'>
					<Table className='all-tasks-table'>
						<thead>
							<tr>
								<th>Title</th>
								<th>Due Date</th>
								<th>Status</th>
								<th>Assignee</th>
								<th>Details</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{allTasks.length > 0 ? (
								allTasks.map((task) => (
									<tr>
										<td>{task.title}</td>
										<td>{task.dueDate}</td>
										<td>{task.status === true ? 'Completed' : 'Incomplete'}</td>
										<td>{task.assignee}</td>
										<td>{task.details}</td>
										<td className='task-mutations'>
											{' '}
											<button
												className='task-btn btn btn-sm btn-warning ml-auto'
												value={task._id}
												onClick={viewEditTask}
											>
												Edit
											</button>{' '}
											<button
												className='task-btn btn btn-sm btn-danger ml-auto'
												value={task._id}
												onClick={deleteTask}
											>
												X
											</button>
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
				</div>
				<AddTask />
			</div>
		</main>
	);
};

export default ViewTask;
