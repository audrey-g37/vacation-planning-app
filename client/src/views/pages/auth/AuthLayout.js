import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

// mui imports
import { Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'views/components/general/MainCard';
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
			sx={{ textAlign: 'center' }}
		>
			{authTypes[authType]}
			<Grid
				container
				sx={{
					justifyContent: 'flex-end',
					alignItems: 'center'
				}}
			>
				<Grid item xs={12} md={6}>
					<Grid container>
						{authType !== 'login' && (
							<Grid item xs={6}>
								<Link to={'/login'}>
									<Typography>Login</Typography>
								</Link>
							</Grid>
						)}
						{authType !== 'register' && (
							<Grid item xs={6}>
								<Link to={'/register'}>
									<Typography>Register</Typography>
								</Link>
							</Grid>
						)}
						{authType !== 'login-help' && (
							<Grid item xs={6}>
								<Link to={'#'}>
									<Typography>Need help logging in?</Typography>
								</Link>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
		</MainCard>
	);
};

export default AuthLayout;
