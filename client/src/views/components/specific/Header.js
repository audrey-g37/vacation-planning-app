import React from 'react';
import { Grid, useTheme, useMediaQuery, AppBar } from '@mui/material';

// project imports
import CollapsedMenu from 'views/components/CollapsedMenu';
import CustomTypography from '../CustomTypography';
import Alert from '../Alert';
import useAuth from 'hooks/useAuth';

const Header = ({ underConstruction }) => {
	const { authInfo, logoutUser, alert } = useAuth();

	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

	const isDarkMode = theme.palette.mode === 'dark';

	const withAuth = authInfo;

	let headerNav = [
		{ text: 'Login', url: '/auth/login' },
		{ text: 'Register', url: '/auth/register' }
	];

	if (withAuth) {
		headerNav = [
			{ text: 'Dashboard', url: '/dashboard' },
			{ text: 'View Trips', url: '/view-trips' },
			{ text: 'Friends', url: '/view-friends/requests' },
			{ text: 'Logout', onClick: logoutUser }
		];
	}

	return (
		<AppBar
			sx={{
				position: 'sticky',
				height: `fit-content`,
				padding: `${medAndUp ? '0.25rem' : '0'}`,
				backgroundColor: theme.palette.custom.navBackground
			}}
		>
			{alert.open && <Alert />}
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
				<Grid item xs={2}>
					<img
						border='0'
						width='50'
						height='50'
						alt='GRIP logo'
						src={`/images/logos/${
							isDarkMode ? 'logo-white' : 'logo'
						}-no-background-no-slogan.png`}
					/>
				</Grid>
				<Grid item xs={8}>
					<CustomTypography
						textContent={'Get a GRIP On Your Group Trip!'}
						variant={medAndUp ? 'h4' : 'subtitle2'}
						customStyle={{ color: theme.palette.primary.main }}
					/>
				</Grid>
				<Grid item xs={2}>
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
			</Grid>
		</AppBar>
	);
};

export default Header;
