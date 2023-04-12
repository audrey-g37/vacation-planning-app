import AuthLayout from 'views/layouts/AuthLayout';
import { Login, Signup } from 'views/pages';

const authRoutes = {
	path: '/',
	element: <AuthLayout />,
	children: [
		{ path: 'login', element: <Login /> },
		{ path: 'signup', element: <Signup /> }
	]
};

export default authRoutes;
