// library imports
import React from 'react';
import { Grid, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import NavMenu from './NavMenu';

const Footer = () => {
	const theme = useTheme();
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
			sx={{
				justifyContent: 'center',
				alignItems: 'center',
				position: 'absolute',
				bottom: '0',
				height: '2.5rem',
				backgroundColor: theme.palette.greyDark
			}}
		>
			<Grid item xs={1}>
				<Tooltip title={'GRIP Code'}>
					<a href='https://github.com/audrey-g37/vacation-planning-app' target='_blank'>
						<img
							alt='Github repo link'
							src='/images/github_logo.png'
							width='30'
							height='30'
						/>
					</a>
				</Tooltip>
			</Grid>
			<Grid item>
				<Grid container>
					<Grid item xs={12}>
						<NavMenu
							navOptions={contributors}
							textField={'name'}
							vertical={false}
							relativePath={false}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Footer;
