import Draggable from 'react-draggable';

import { Dialog, DialogContent, DialogTitle, Grid, Paper, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import TripForm from './forms/Trip';
import CustomTypography from './CustomTypography';
import SubmitButton from './SubmitButton';
import CustomDivider from './CustomDivider';

function PaperComponent(props) {
	return (
		<Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}

const DraggableDialog = ({
	isOpen = false,
	setClosed,
	formData = {},
	edit = false,
	itemName = '',
	collection
}) => {
	const theme = useTheme();

	const formInfoObj = {
		edit: edit,
		formData: formData,
		setClosed: setClosed
	};

	const collectionTypes = {
		trip: <TripForm {...formInfoObj} />
	};

	return (
		<Dialog
			open={isOpen}
			PaperComponent={PaperComponent}
			aria-labelledby='draggable-dialog-title'
			fullWidth={true}
		>
			<Grid
				container
				sx={{ backgroundColor: theme.palette.background, flexDirection: 'column' }}
			>
				<Grid item xs={12}>
					<DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
						<Grid
							container
							sx={{ justifyContent: 'space-between', alignItems: 'center' }}
						>
							<Grid item>
								<CustomTypography
									textContent={`${edit ? 'Edit' : 'New'} ${itemName}`}
									customStyle={{
										fontSize: theme.typography.h6,
										color: theme.palette.text.secondary
									}}
								/>
							</Grid>
							<Grid item>
								<SubmitButton icon={<CloseIcon />} onClick={setClosed} />
							</Grid>
						</Grid>
					</DialogTitle>
				</Grid>
				<CustomDivider />
				<Grid item xs={12}>
					<DialogContent>{collectionTypes[collection]}</DialogContent>
				</Grid>
			</Grid>
		</Dialog>
	);
};

export default DraggableDialog;
