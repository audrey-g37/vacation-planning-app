import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Card, CardContent, CardHeader, Grid, useMediaQuery, useTheme } from '@mui/material';

import CustomDivider from './CustomDivider';
import CustomTypography from './CustomTypography';

const MainCard = forwardRef(({ sx = {}, title = '', children, actionSection, ...others }, ref) => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

	return (
		<Card
			ref={ref}
			{...others}
			sx={{
				...sx,
				height: medAndUp ? '65vh' : '70vh',
				width: medAndUp ? '60vw' : '85vw',
				margin: '4rem auto',
				backgroundColor: theme.palette.background,
				position: 'relative'
			}}
		>
			<Grid
				container
				spacing={theme.spacing()}
				sx={{
					flexWrap: 'nowrap',
					justifyContent: 'center'
				}}
			>
				{title && (
					<Grid item>
						<CardHeader
							title={
								<CustomTypography
									variant={medAndUp ? 'h5' : 'body1'}
									textContent={title}
									textAlign={'center'}
								/>
							}
						/>
					</Grid>
				)}
			</Grid>
			{title && <CustomDivider />}

			{children && <CardContent>{children}</CardContent>}
			{actionSection && (
				<Grid container spacing={theme.spacing()} sx={{ position: 'absolute', bottom: 0 }}>
					{actionSection}
				</Grid>
			)}
		</Card>
	);
});

MainCard.propTypes = {
	sx: PropTypes.object,
	children: PropTypes.node,
	actionSection: PropTypes.node,
	title: PropTypes.string
};

export default MainCard;
