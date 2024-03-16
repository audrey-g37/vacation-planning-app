import MainLayout from 'views/layouts/MainLayout';
import ViewFriends from 'views/pages/Friends';
import { Dashboard, EditTask, ViewAllTrips, ViewSingleTrip, ViewTask } from 'views/pages/index';

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
			path: 'friends',
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
				}
			]
		}
	]
};

export default mainRoutes;
