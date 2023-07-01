import { useLocation } from 'react-router';

// mui imports
import { Grid, useTheme, useMediaQuery } from '@mui/material';

// project imports
import MainCard from 'views/components/re-usable/MainCard.js';
import CustomTypography from 'views/components/re-usable/CustomTypography.js';
import Login from './Login.js';
import Register from './Register.js';

const AuthLayout = ({}) => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

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
				textAlign: 'center',
				margin: '0.5rem 0'
			}}
		>
			{authType !== 'login-help' && (
				<Grid item xs={4}>
					<CustomTypography
						tooltipText={'Forgot Username/Password'}
						to={'#'}
						textContent={'Forgot Credentials?'}
					/>
				</Grid>
			)}
			{authType !== 'login' && (
				<Grid item xs={4}>
					<CustomTypography tooltipText={'Login'} to={'/login'} textContent={'Login'} />
				</Grid>
			)}
			{authType !== 'register' && (
				<Grid item xs={4}>
					<CustomTypography
						tooltipText={'Create Account'}
						to={'/register'}
						textContent={'Register'}
					/>
				</Grid>
			)}
		</Grid>
	);

	return (
		<MainCard
			title={`${authType.charAt(0).toUpperCase()}${authType.slice(1, authType.length)}`}
			actionSection={AuthNavLinks}
			sx={{ margin: '2rem auto', maxWidth: medAndUp ? '55vw' : '85vw' }}
		>
			{authTypes[authType]}
		</MainCard>
	);
};

export default AuthLayout;
