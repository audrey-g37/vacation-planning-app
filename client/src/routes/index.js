import { useRoutes } from 'react-router-dom';

// routes
import AuthRoutes from './auth-routes';
import MainRoutes from './main-routes';

export default function Routes() {
	const authSessionInfo = JSON.parse(window.sessionStorage.getItem('authInfo'));
	const userSessionInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
	let routes = [AuthRoutes];
	if (authSessionInfo && userSessionInfo) {
		routes.push(MainRoutes);
	}

	return useRoutes(routes);
}
