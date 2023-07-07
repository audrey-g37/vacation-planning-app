// library imports
import React from 'react';
import { Grid, useTheme, useMediaQuery } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import CopyrightIcon from '@mui/icons-material/Copyright';

// project imports
import NavMenu from 'views/components/NavMenu';
import CustomTypography from '../CustomTypography';

const Footer = () => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

	return (
		<Grid
			container
			spacing={theme.spacing()}
			sx={{
				justifyContent: 'center',
				alignItems: 'center',
				position: `fixed`,
				bottom: '0',
				height: 'fit-content',
				backgroundColor: theme.palette.custom.navBackground,
				textAlign: 'center'
			}}
		>
			<Grid item xs={12} md={6}>
				<Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
					<Grid item sx={{ margin: '0 0.5rem' }}>
						<CustomTypography
							to={'https://github.com/audrey-g37'}
							relativePath={false}
							icon={<GitHubIcon fontSize={medAndUp ? 'medium' : 'small'} />}
							tooltipText={'Github Profile'}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} md={6}>
				<Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
					{/* <Grid item>
                    // todo figure out if I can copyright the website
						<CustomTypography textContent={'Copyright'} />
					</Grid>
					<Grid item sx={{ margin: '0 0.5rem' }}>
						<CustomTypography icon={<CopyrightIcon fontSize={'small'} />} />
					</Grid> */}
					<Grid item>
						<CustomTypography
							// todo when new portfolio, comment in
							// to={'https://webappsbyaudrey.com'}
							// relativePath={false}
							textContent={'2023 Custom Web Apps By Audrey'}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Footer;
