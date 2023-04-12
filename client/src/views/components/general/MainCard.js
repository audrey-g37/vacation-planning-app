import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MainCard = forwardRef(({ sx = {}, title = '', children, ...others }, ref) => {
	const theme = useTheme();
	return (
		<Card
			ref={ref}
			{...others}
			sx={{ ...sx, flexWrap: 'nowrap', height: '60vh', width: '60vw', margin: 'auto' }}
		>
			{title && (
				<>
					<CardHeader title={<Typography variant='h4'>{title}</Typography>} />
					<Divider />
				</>
			)}

			{children && <CardContent>{children}</CardContent>}
		</Card>
	);
});

MainCard.propTypes = {
	sx: PropTypes.object,
	title: PropTypes.string
};

export default MainCard;
