import React from 'react';
import { Grid, useTheme, useMediaQuery } from '@mui/material';

// project imports
import CollapsedMenu from 'views/components/general/CollapsedMenu';
import Auth from 'utils/auth';
import CustomTypography from '../general/CustomTypography';

const MainNav = ({ underConstruction }) => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};

	const withAuth = Auth.loggedIn();

	const headerNav = [
		{ text: 'Login', url: '/login' },
		{ text: 'Register', url: '/register' }
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
				alignItems: 'center',
				position: 'absolute',
				flexWrap: 'nowrap',
				top: '0',
				height: '4rem',
				backgroundColor: theme.palette.navBackground
			}}
		>
			<Grid item xs={12} sx={{ textAlign: 'center' }}>
				<CustomTypography
					textContent={'Get a GRIP On Your Group Trip!'}
					variant={medAndUp ? 'h4' : 'subtitle1'}
				/>
			</Grid>

			<Grid item>
				<Grid container>
					<Grid item>
						<CollapsedMenu
							options={
								underConstruction
									? headerNav.map(
											(navOption) => (navOption = { ...navOption, url: '#' })
									  )
									: headerNav
							}
							textField={'text'}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default MainNav;
