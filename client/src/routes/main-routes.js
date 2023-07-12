import MainLayout from 'views/layouts/MainLayout';
import ViewFriends from 'views/pages/Friends';
import {
	Dashboard,
	EditBudget,
	EditTask,
	ViewAllTrips,
	ViewBudget,
	ViewSingleTrip,
	ViewTask
} from 'views/pages/index';

const mainRoutes = {
	path: '/',
	element: <MainLayout />,
	children: [
		{
			path: 'dashboard',
			element: <Dashboard />
		},
		{
			path: 'view-trips',
			element: <ViewAllTrips />
		},
		{
			path: 'view-friends',
			element: <ViewFriends />
		},
		{
			path: 'view-trip/:id',
			element: <ViewSingleTrip />,
			children: [
				{
					path: 'view-trip/:id/view-tasks',
					element: <ViewTask />
				},
				{
					path: 'view-trip/:id/view-tasks/:id',
					element: <EditTask />
				},
				{
					path: 'view-trip/:id/view-budget',
					element: <ViewBudget />
				},
				{
					path: 'view-trip/:id/view-budgets/:id',
					element: <EditBudget />
				}
			]
		}
	]
};

export default mainRoutes;
