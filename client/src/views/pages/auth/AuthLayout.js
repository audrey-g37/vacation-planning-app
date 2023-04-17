import { useLocation } from 'react-router';

// mui imports
import { Grid, useTheme } from '@mui/material';

// project imports
import MainCard from 'views/components/re-usable/MainCard';
import CustomTypography from 'views/components/re-usable/CustomTypography';
import Login from './Login';
import Register from './Register';

const AuthLayout = ({}) => {
	const theme = useTheme();
	const { pathname } = useLocation();
	const authType = pathname.replace('/', '') || 'login';
	const authTypes = {
		login: <Login />,
		register: <Register />
		// 'login-help': <ForgotUserData />
	};

	const AuthNavLinks = (
		<Grid
			container
			spacing={theme.spacing()}
			sx={{
				alignItems: 'center',
				justifyContent: 'space-around',
				marginBottom: '0.5rem'
			}}
		>
			{authType !== 'login-help' && (
				<CustomTypography
					tooltipText={'Forgot Username/Password'}
					to={'#'}
					textContent={'Need help logging in?'}
				/>
			)}
			{authType !== 'login' && (
				<CustomTypography tooltipText={'Login'} to={'/login'} textContent={'Login'} />
			)}
			{authType !== 'register' && (
				<CustomTypography
					tooltipText={'Create Account'}
					to={'/register'}
					textContent={'Register'}
				/>
			)}
		</Grid>
	);

	return (
		<MainCard
			title={`${authType.charAt(0).toUpperCase()}${authType.slice(1, authType.length)}`}
			actionSection={AuthNavLinks}
		>
			{authTypes[authType]}
		</MainCard>
	);
};

export default AuthLayout;
