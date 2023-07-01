import { useContext } from 'react';

// auth provider
import AuthContext from 'contexts/auth/Auth.js';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) throw new Error('context must be used inside provider');

	return context;
};

export default useAuth;
