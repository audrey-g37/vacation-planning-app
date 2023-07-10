import { useContext } from 'react';

// auth provider
import AuthContext from 'contexts/auth/Auth';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) throw new Error('context must be used inside provider');

	const { isLoggedIn, navigate } = context;
	const url = window.location.pathname;

	if (!isLoggedIn && url === '/') {
		navigate('auth/login');
	}

	return context;
};

export default useAuth;
