import MainLayout from 'views/layouts/MainLayout';
import ViewFriends from 'views/pages/Friends';
import { Dashboard, ViewAllTrips, ViewSingleTrip } from 'views/pages/index';

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
			element: <ViewSingleTrip />
		}
	]
};

export default mainRoutes;
