import AuthMain from 'views/layouts/AuthLayout';

const authRoutes = {
	path: '/',
	element: <AuthMain />,
	children: [
		{ path: 'login', element: <AuthMain /> },
		{ path: 'register', element: <AuthMain /> }
	]
};

export default authRoutes;
