import React from 'react';
import { Grid, useTheme, useMediaQuery, AppBar } from '@mui/material';

// project imports
import CollapsedMenu from 'views/components/re-usable/CollapsedMenu';
import CustomTypography from '../re-usable/CustomTypography';
import useAuth from 'hooks/useAuth';

const Header = ({ underConstruction }) => {
	const { authSessionInfo, logoutUser } = useAuth();

	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

	const withAuth = authSessionInfo;

	let headerNav = [
		{ text: 'Login', url: '/login' },
		{ text: 'Register', url: '/register' }
	];

	if (withAuth) {
		headerNav = [
			{ text: 'Dashboard', url: '/dashboard' },
			{ text: 'View Trips', url: '/view-trips' },
			{ text: 'Logout', onClick: logoutUser }
		];
	}

	return (
		<AppBar
			sx={{
				position: 'sticky',
				height: `fit-content`,
				padding: '0.5rem',
				backgroundColor: theme.palette.navBackground
			}}
		>
			<Grid
				container
				spacing={theme.spacing()}
				sx={{
					height: '100%',
					textAlign: 'center',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<Grid item xs={12} sm={8}>
					<CustomTypography
						textContent={'Get a GRIP On Your Group Trip!'}
						variant={medAndUp ? 'h4' : 'subtitle1'}
						customStyle={{ color: theme.palette.primary.main }}
					/>
				</Grid>

				{medAndUp && (
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
							tooltipText={'Menu'}
						/>
					</Grid>
				)}
			</Grid>
		</AppBar>
	);
};

export default Header;
