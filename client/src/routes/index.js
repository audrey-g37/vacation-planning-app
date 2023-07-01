import { useRoutes } from 'react-router-dom';

// routes
import AuthRoutes from './auth-routes.js';
import MainRoutes from './main-routes.js';

export default function Routes() {
	let routes = [AuthRoutes, MainRoutes];

	return useRoutes(routes);
}
