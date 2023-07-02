import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
	useMediaQuery,
	useTheme
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import CustomDivider from './CustomDivider';
import CustomTypography from './CustomTypography';

const MainCard = forwardRef(
	({ sx = {}, title = '', newItem = '', children, actionSection, ...others }, ref) => {
		const theme = useTheme();
		const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

		let cardHeaderProps = {
			title: (
				<CustomTypography
					variant={medAndUp ? 'h5' : 'body1'}
					textContent={title}
					textAlign={'center'}
					customStyle={{ color: theme.palette.primary.main }}
				/>
			)
		};
		if (newItem) {
			cardHeaderProps = {
				...cardHeaderProps,
				action: (
					<IconButton aria-label={newItem}>
						<AddBoxIcon sx={{ color: theme.palette.primary.main }} />
					</IconButton>
				)
			};
		}

		return (
			<Card
				ref={ref}
				{...others}
				sx={{
					...sx,
					backgroundColor: theme.palette.background
				}}
			>
				<Grid
					container
					spacing={theme.spacing()}
					sx={{
						flexWrap: 'nowrap'
					}}
				>
					{title && (
						<Grid item xs={12}>
							<CardHeader
								{...cardHeaderProps}
								sx={{
									textAlign: 'center'
								}}
							/>
						</Grid>
					)}
				</Grid>
				{title && <CustomDivider />}

				{children && <CardContent>{children}</CardContent>}
				{actionSection && actionSection}
			</Card>
		);
	}
);

MainCard.propTypes = {
	sx: PropTypes.object,
	children: PropTypes.node,
	actionSection: PropTypes.node,
	title: PropTypes.string,
	newItem: PropTypes.string
};

export default MainCard;
