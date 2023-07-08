import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { Card, CardContent, CardHeader, Grid, useMediaQuery, useTheme } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';

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
			editItem = '',
			formData = {},
			queryResults,
			children,
			actionSection,
			...others
		},
		ref
	) => {
		const theme = useTheme();
		const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

		const [dialogOpen, setDialogOpen] = useState({ open: false, formData: formData });

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
						onClick={() => setDialogOpen({ open: true })}
						customStyle={{ color: theme.palette.primary.main }}
					/>
				)
			};
		} else if (editItem) {
			cardHeaderProps = {
				...cardHeaderProps,
				action: (
					<SubmitButton
						icon={<EditIcon />}
						tooltipText={`Edit`}
						onClick={() => setDialogOpen({ open: true, formData: formData })}
						customStyle={{ color: theme.palette.primary.main }}
					/>
				)
			};
		}

		if (!sx.maxWidth) {
			sx = { ...sx, maxWidth: medAndUp ? '65vw' : '85vw' };
		}

		if (!sx.margin) {
			sx = { ...sx, margin: '2rem auto' };
		}

		return (
			<Card ref={ref} {...others} sx={sx}>
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
				{dialogOpen.open && (
					<Form
						isOpen={dialogOpen.open}
						itemName={newItem}
						setClosed={() => setDialogOpen({ open: false })}
						queryResults={queryResults}
						collection={collection}
						edit={!!editItem}
						formData={dialogOpen.formData}
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
	editItem: PropTypes.string,
	formData: PropTypes.object,
	queryResults: PropTypes.func
};

export default MainCard;
