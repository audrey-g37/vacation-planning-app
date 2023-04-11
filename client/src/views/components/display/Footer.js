// library imports
import React from 'react';
import { Grid } from '@mui/material';

// project imports
import NavMenu from './NavMenu';

const Footer = () => {
	const contributors = [
		{ name: 'Audrey Gillies', gitUser: 'audrey-g37' },
		{ name: 'Gina Im', gitUser: 'gim928' },
		{ name: 'Adrian Auchterlonie', gitUser: 'adrianauch' },
		{ name: 'Edgar Calderon', gitUser: 'Ecalderon10' },
		{ name: 'Korbin Sargent', gitUser: 'Korbin-Sargent' }
	];

	for (let contributor of contributors) {
		contributor.url = ` https://github.com/${contributor.gitUser}`;
	}

	return (
		<Grid
			container
			sx={{
				justifyContent: 'center',
				alignItems: 'flex-end',
				position: 'absolute',
				bottom: '0'
			}}
		>
			<Grid item xs={1}>
				<a href='https://github.com/audrey-g37/vacation-planning-app' target='_blank'>
					<img
						alt='Github repo link'
						src='/images/github_logo.png'
						width='30'
						height='30'
					/>
				</a>
			</Grid>
			<Grid item>
				<Grid container>
					<Grid item xs={12}>
						<NavMenu
							navOptions={contributors}
							textField={'name'}
							vertical={false}
							color={'black'}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Footer;
