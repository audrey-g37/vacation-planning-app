import { useRoutes } from 'react-router-dom';

// routes
import AuthRoutes from './auth-routes';
import AuthenticationRoutes from './AuthenticationRoutes';

export default function ThemeRoutes() {
	let routes = [AuthRoutes, AuthenticationRoutes];

	return useRoutes(routes);
}
