import React from 'react';
import { Link } from 'react-router-dom';
import './ViewBudget.css';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_BUDGETS, QUERY_TRIP } from 'utils/queries';
import { Table, Button } from '@mui/material';
import BudgetForm from './budgetForm';
import { REMOVE_BUDGET } from 'utils/mutations';
import Auth from 'utils/auth';

const ViewBudget = () => {
	const tripId = Auth.getTripId();
	const currentUser = Auth.getUsername();
	const { data: data1 } = useQuery(QUERY_USER, {
		variables: { username: currentUser }
	});
	const userData = data1?.user || [];
	const { data: data2 } = useQuery(QUERY_TRIP, {
		variables: { tripId: tripId, userId: userData._id }
	});
	const tripData = data2?.trip || [];
	const { loading, data } = useQuery(QUERY_BUDGETS, { variables: { tripId: tripId } });
	const allExpenses = data?.budgets || [];
	// console.log(allExpenses);

	const [removeBudget, { error }] = useMutation(REMOVE_BUDGET);
	const tripIdToRemove = Auth.getTripId();

	const spending = allExpenses.map((expense) => {
		return parseInt(expense.value);
	});
	// console.log(spending)

	const sumBudget = (array) => {
		let total = 0;
		for (let i = 0; i < array.length; i++) {
			total += array[i];
			// console.log(total)
		}
		return total;
	};

	let weSpent = sumBudget(spending);

	//  console.log(weSpent)

	const viewEditBudget = (event) => {
		event.preventDefault();
		const { value } = event.target;

		window.location.replace(`/${tripId}/view-budgets/${value}`);
	};

	const deleteBudget = async (event) => {
		event.preventDefault();
		const { value } = event.target;
		// console.log(value);
		await removeBudget({
			variables: {
				tripId: tripIdToRemove,
				budgetId: value
			}
		}).then((data) => {
			// console.log(data);
			window.location.reload();
		});
	};

	return (
		<main className='budget'>
			<Link to={`/view-trip/${tripId}`}>
				<Button id='back-to-trip-details'>Back to Trip Details</Button>
			</Link>
			<h2 className='all-tasks-title'>Budget: {tripData.title}</h2>
			<div className='task-tables'>
				<div className='current-tasks'>
					<Table className='all-tasks-table'>
						<thead>
							<tr>
								<th>Expense Name</th>
								<th>Amount</th>
								<th>Purchased Date</th>
								<th>Purchased By</th>
								<th>Delete</th>
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
											{' '}
											<Button
												value={budget._id}
												className='task-btn btn btn-sm btn-warning ml-auto'
												onClick={viewEditBudget}
											>
												Edit
											</Button>{' '}
											<Button
												value={budget._id}
												className='task-btn btn btn-sm btn-danger ml-auto'
												onClick={deleteBudget}
											>
												X
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
					<h4 id='current-sum'> Total: ${weSpent}</h4>
				</div>
				<BudgetForm />
			</div>
		</main>
	);
};

export default ViewBudget;
