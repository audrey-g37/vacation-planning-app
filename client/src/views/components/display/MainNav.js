import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import NavMenu from 'views/components/display/NavMenu';
import Auth from 'utils/auth';

const MainNav = ({ underConstruction }) => {
	const theme = useTheme();
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};

	const withAuth = Auth.loggedIn();

	const headerNav = [
		{ text: 'GRIP', url: '/', tooltipText: 'Home' },
		{ text: 'Login', url: '/' },
		{ text: 'Signup', url: '/signup' }
	];

	if (withAuth) {
		headerNav.push(
			{ text: 'Dashboard', url: '/dashboard' },
			{ text: 'View Trips', url: '/view-trips' }
		);
	}

	return (
		<Grid
			container
			sx={{
				justifyContent: 'flex-start',
				alignItems: 'center',
				position: 'absolute',
				top: '0',
				height: '3rem',
				backgroundColor: theme.palette.greyDark
			}}
		>
			<Grid item>
				<NavMenu
					navOptions={
						underConstruction
							? headerNav.map((navOption) => (navOption = { ...navOption, url: '#' }))
							: headerNav
					}
					textField={'text'}
					vertical={false}
				/>
			</Grid>
		</Grid>
	);
};

export default MainNav;
