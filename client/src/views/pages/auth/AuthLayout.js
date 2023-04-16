import { useLocation } from 'react-router';

// mui imports
import { Grid } from '@mui/material';

// project imports
import MainCard from 'views/components/general/MainCard';
import CustomTypography from 'views/components/general/CustomTypography';
import Login from './Login';
import Register from './Register';

const AuthLayout = ({}) => {
	const { pathname } = useLocation();
	const authType = pathname.replace('/', '') || 'login';
	const authTypes = {
		login: <Login />,
		register: <Register />
		// 'login-help': <ForgotUserData />
	};
	return (
		<MainCard
			title={`${authType.charAt(0).toUpperCase()}${authType.slice(1, authType.length)}`}
			sx={{ textAlign: 'center', position: 'relative' }}
		>
			{authTypes[authType]}

			<Grid
				container
				sx={{
					position: 'absolute',
					bottom: '1rem',
					left: 0,
					alignItems: 'center',
					justifyContent: 'space-around'
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
		</MainCard>
	);
};

export default AuthLayout;
