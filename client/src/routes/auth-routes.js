import { Login, Signup } from 'views/pages';

export default function AuthRoutes() {
	let authRoutes = useRoutes([
		{
			path: '/',
			element: <Login />
		},
		{ path: 'signup', element: <Signup /> }
	]);

	return authRoutes;
}
