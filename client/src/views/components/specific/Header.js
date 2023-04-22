import React from 'react';
import { Grid, useTheme, useMediaQuery, AppBar } from '@mui/material';

// project imports
import CollapsedMenu from 'views/components/re-usable/CollapsedMenu';
import CustomTypography from '../re-usable/CustomTypography';
import useAuth from 'hooks/useAuth';

const Header = ({ underConstruction }) => {
	const { isLoggedIn } = useAuth();
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

	const withAuth = isLoggedIn || false;

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
		<AppBar
			sx={{
				position: 'sticky',
				height: `${medAndUp ? 3.5 : 2}rem`,
				backgroundColor: theme.palette.navBackground
			}}
		>
			<Grid
				container
				spacing={theme.spacing()}
				sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
			>
				<Grid item xs={10} sx={{ textAlign: 'center' }}>
					<CustomTypography
						textContent={'Get a GRIP On Your Group Trip!'}
						variant={medAndUp ? 'h4' : 'subtitle1'}
					/>
				</Grid>

				{medAndUp && (
					<Grid item xs={2}>
						<Grid container spacing={theme.spacing()}>
							<Grid item>
								<CollapsedMenu
									options={
										underConstruction
											? headerNav.map(
													(navOption) =>
														(navOption = { ...navOption, url: '#' })
											  )
											: headerNav
									}
									textField={'text'}
									tooltipText={'Menu'}
								/>
							</Grid>
						</Grid>
					</Grid>
				)}
			</Grid>
		</AppBar>
	);
};

export default Header;
