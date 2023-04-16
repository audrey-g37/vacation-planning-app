import AuthMain from 'views/pages/auth';

const authRoutes = {
	path: '/',
	element: <AuthMain />,
	children: [
		{ path: 'login', element: <AuthMain /> },
		{ path: 'register', element: <AuthMain /> }
	]
};

export default authRoutes;
