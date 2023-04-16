import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

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
					bottom: '3rem',
					left: 0,
					alignItems: 'center'
				}}
			>
				{authType !== 'login-help' && (
					<Grid item xs={6}>
						<Link to={'#'}>
							<CustomTypography textContent={'Need help logging in?'} />
						</Link>
					</Grid>
				)}
				{authType !== 'login' && (
					<Grid item xs={6}>
						<Link to={'/login'}>
							<CustomTypography textContent={'Login'} />
						</Link>
					</Grid>
				)}
				{authType !== 'register' && (
					<Grid item xs={6}>
						<Link to={'/register'}>
							<CustomTypography textContent={'Register'} />
						</Link>
					</Grid>
				)}
			</Grid>
		</MainCard>
	);
};

export default AuthLayout;
