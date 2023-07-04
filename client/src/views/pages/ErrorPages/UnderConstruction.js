import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import CustomTypography from 'views/components/CustomTypography';

const UnderConstruction = ({ lastModifiedDate }) => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	const displayDate = new Date(lastModifiedDate).toLocaleDateString('en-us', options);

	return (
		<Box
			sx={{
				background: theme.palette.background,
				textAlign: 'center',
				margin: '1.5rem auto',
				padding: `${medAndUp ? 1 : 0.5}rem`,
				width: 'fit-content',
				border: `solid`
			}}
		>
			<CustomTypography
				textContent={'Website Under Construction'}
				variant={medAndUp ? 'h4' : 'h6'}
			/>
			<br />
			<CustomTypography
				textContent={'Please check back later!'}
				variant={medAndUp ? 'h6' : 'body1'}
				customStyle={{ color: theme.palette.text.primary }}
			/>
			<br />
			<CustomTypography
				textContent={`Last Modified: ${displayDate}`}
				variant={medAndUp ? 'h6' : 'body1'}
				customStyle={{ color: theme.palette.text.primary }}
			/>
		</Box>
	);
};

export default UnderConstruction;
