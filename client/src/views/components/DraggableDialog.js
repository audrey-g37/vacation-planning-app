import Draggable from 'react-draggable';

import { Dialog, DialogContent, DialogTitle, Grid, Paper, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import TripForm from './forms/Trip';
import CustomTypography from './CustomTypography';

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
		formData: formData
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
			<DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
				<Grid container sx={{ justifyContent: 'space-between' }}>
					<Grid item>
						<CustomTypography
							textContent={`${edit ? 'Edit' : 'New'} ${itemName}`}
							customStyle={{ fontSize: theme.typography.h6 }}
						/>
					</Grid>
					<Grid item>
						<CustomTypography icon={<CloseIcon />} button={true} onClick={setClosed} />
					</Grid>
				</Grid>
			</DialogTitle>
			<DialogContent>{collectionTypes[collection]}</DialogContent>
		</Dialog>
	);
};

export default DraggableDialog;
