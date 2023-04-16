import AuthLayout from 'views/pages/auth/AuthLayout';
import {
	Dashboard,
	EditBudget,
	EditTask,
	ViewAllTrips,
	ViewBudget,
	ViewSingleTrip,
	ViewTask
} from 'views/pages';

const mainRoutes = {
	path: '/',
	element: <AuthLayout />,
	children: [
		{
			path: '/dashboard',
			element: <Dashboard />
		},
		{
			path: '/view-trips',
			element: <ViewAllTrips />
		},
		{
			path: '/view-trip/:id',
			element: <ViewSingleTrip />,
			children: [
				{
					path: '/view-trip/:id/view-tasks',
					element: <ViewTask />
				},
				{
					path: '/view-trip/:id/view-tasks/:id',
					element: <EditTask />
				},
				{
					path: '/view-trip/:id/view-budget',
					element: <ViewBudget />
				},
				{
					path: '/view-trip/:id/view-budgets/:id',
					element: <EditBudget />
				}
			]
		}
	]
};

export default mainRoutes;
