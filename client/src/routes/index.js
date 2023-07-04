import { useRoutes } from 'react-router-dom';

// routes
import AuthRoutes from './auth-routes';
import MainRoutes from './main-routes';
import useAuth from 'hooks/useAuth';

const Routes = () => {
	const { isLoggedIn } = useAuth();
	const authSessionInfo = JSON.parse(window.sessionStorage.getItem('authInfo'));
	const userSessionInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
	let routes = [AuthRoutes];
	if (isLoggedIn || (authSessionInfo && userSessionInfo)) {
		routes.push(MainRoutes);
	}

	return useRoutes(routes);
};

export default Routes;
