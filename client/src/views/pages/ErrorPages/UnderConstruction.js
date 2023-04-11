import React from 'react';
import { Grid } from '@mui/material';

const UnderConstruction = () => {
	return (
		<Grid container sx={{ justifyContent: 'center', margin: '30px' }}>
			<Grid
				row
				sx={{
					background: 'white',
					textAlign: 'center',
					fontSize: '2.5rem',
					padding: '0.5rem',
					border: 'solid black'
				}}
			>
				Website Under Construction
				<br />
				<span style={{ fontSize: '2.0rem' }}>Please Check Back Later!</span>
			</Grid>
		</Grid>
	);
};

export default UnderConstruction;
