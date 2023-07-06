import AuthMain from 'views/layouts/AuthLayout';

const authRoutes = {
	path: '/',
	element: <AuthMain />,
	children: [
		{ path: 'auth/login', element: <AuthMain /> },
		{ path: 'auth/register', element: <AuthMain /> }
	]
};

export default authRoutes;
