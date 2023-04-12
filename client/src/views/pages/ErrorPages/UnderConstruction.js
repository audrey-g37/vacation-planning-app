import React from 'react';
import { Box, Grid } from '@mui/material';

const UnderConstruction = ({ lastModifiedDate }) => {
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	const displayDate = new Date(lastModifiedDate).toLocaleDateString('en-us', options);

	return (
		<Grid container sx={{ justifyContent: 'center', paddingTop: '5rem' }}>
			<Grid item>
				<Box
					sx={{
						background: 'white',
						textAlign: 'center',
						fontSize: '2.5rem',
						padding: '0.5rem',
						border: 'solid black'
					}}
				>
					<p>Website Under Construction</p>
					<span style={{ fontSize: '2.0rem' }}>Please Check Back Later!</span>
					<br />
					<span style={{ fontSize: '1rem' }}>Last Modified: {displayDate}</span>
				</Box>
			</Grid>
		</Grid>
	);
};

export default UnderConstruction;
