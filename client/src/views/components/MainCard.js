import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { Card, CardContent, CardHeader, Grid, useMediaQuery, useTheme } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import CustomDivider from './CustomDivider';
import CustomTypography from './CustomTypography';
import Form from 'views/components/forms';
import SubmitButton from './SubmitButton';

const MainCard = forwardRef(
	(
		{
			sx = {},
			title = '',
			collection = '',
			newItem = '',
			queryResults,
			children,
			actionSection,
			...others
		},
		ref
	) => {
		const theme = useTheme();
		const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

		const [dialogOpen, setDialogOpen] = useState(false);

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
					<SubmitButton
						icon={<AddBoxIcon />}
						tooltipText={`Add ${newItem}`}
						onClick={() => setDialogOpen(true)}
						customStyle={{ color: theme.palette.primary.main }}
					/>
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
				{dialogOpen && (
					<Form
						isOpen={dialogOpen}
						itemName={newItem}
						setClosed={async () => {
							setDialogOpen(false);
							queryResults && (await queryResults());
						}}
						collection={collection}
					/>
				)}
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
	collection: PropTypes.string,
	newItem: PropTypes.string,
	queryResults: PropTypes.func
};

export default MainCard;
