import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	Grid,
	Typography,
	useMediaQuery,
	useTheme
} from '@mui/material';

import CustomDivider from './CustomDivider';

const MainCard = forwardRef(({ sx = {}, title = '', children, ...others }, ref) => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

	return (
		<Card
			ref={ref}
			{...others}
			sx={{
				...sx,
				display: 'flex',
				flexWrap: 'nowrap',
				height: '60vh',
				width: '60vw',
				margin: 'auto'
			}}
		>
			<Grid container>
				{title && (
					<Grid item xs={12} sx={{ height: medAndUp ? '15%' : '10%' }}>
						<CardHeader
							title={
								<Typography variant={medAndUp ? 'h4' : 'subtitle1'}>
									{title}
								</Typography>
							}
						/>
						<CustomDivider />
					</Grid>
				)}

				{children && (
					<Grid item xs={12} sx={{ height: medAndUp ? '85%' : '90%', margin: '1rem' }}>
						<CardContent sx={{ margin: '0.5 rem', height: '100%' }}>
							{children}
						</CardContent>
					</Grid>
				)}
			</Grid>
		</Card>
	);
});

MainCard.propTypes = {
	sx: PropTypes.object,
	title: PropTypes.string
};

export default MainCard;
