// library imports
import React from 'react';
import { Grid, useTheme, useMediaQuery } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

// project imports
import NavMenu from 'views/components/NavMenu';
import CustomTypography from '../CustomTypography';

const Footer = () => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));
	const lgAndUp = useMediaQuery(theme.breakpoints.up('md'));
	const contributors = [
		{ name: 'Audrey Gillies', gitUser: 'audrey-g37' },
		{ name: 'Gina Im', gitUser: 'gim928' },
		{ name: 'Adrian Auchterlonie', gitUser: 'adrianauch' },
		{ name: 'Edgar Calderon', gitUser: 'Ecalderon10' },
		{ name: 'Korbin Sargent', gitUser: 'Korbin-Sargent' }
	].map(
		(contributor) =>
			(contributor = {
				...contributor,
				url: ` https://github.com/${contributor.gitUser}`,
				tooltipText: 'Github Profile'
			})
	);

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
				backgroundColor: theme.palette.custom.navBackground
			}}
		>
			<Grid item xs={2}>
				<CustomTypography
					to={'https://github.com/audrey-g37/vacation-planning-app'}
					relativePath={false}
					icon={<GitHubIcon fontSize={medAndUp ? 'large' : 'medium'} />}
					tooltipText={'Grip Code'}
				/>
			</Grid>
			<Grid item xs={9} md={6} lg={4}>
				<NavMenu
					sx={{ justifyContent: 'center', flexWrap: medAndUp ? 'nowrap' : 'wrap' }}
					options={contributors}
					textField={'name'}
					relativePath={false}
				/>
			</Grid>
		</Grid>
	);
};

export default Footer;
