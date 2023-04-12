import { useRoutes } from 'react-router-dom';

// routes
import AuthRoutes from './auth-routes';
import MainRoutes from './main-routes';

export default function Routes() {
	let routes = [AuthRoutes];

	return useRoutes(routes);
}
