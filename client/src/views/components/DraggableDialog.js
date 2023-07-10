import Draggable from 'react-draggable';

import {
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	Paper,
	useTheme,
	useMediaQuery
} from '@mui/material';
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
	onSubmit,
	formData = {},
	edit = false,
	itemName = '',
	collection
}) => {
	const theme = useTheme();
	const lgAndUp = useMediaQuery(theme.breakpoints.up('md'));

	const formInfoObj = {
		edit: edit,
		formData: formData,
		onSubmit: onSubmit
	};

	const collectionTypes = {
		trip: <TripForm {...formInfoObj} />
	};

	return (
		<Dialog
			open={isOpen}
			PaperComponent={PaperComponent}
			aria-labelledby={lgAndUp ? 'draggable-dialog-title' : 'dialog-title'}
			fullWidth={true}
		>
			<Grid container sx={{ flexDirection: 'column' }}>
				<Grid item xs={12}>
					<DialogTitle
						style={{ cursor: 'move' }}
						id={lgAndUp ? 'draggable-dialog-title' : 'dialog-title'}
					>
						<Grid
							container
							sx={{ justifyContent: 'space-between', alignItems: 'center' }}
						>
							<Grid item xs={11}>
								<CustomTypography
									textContent={`${edit ? 'Edit' : 'New'} ${itemName}`}
									customStyle={{
										fontSize: theme.typography.h6,
										color: theme.palette.text.secondary
									}}
								/>
							</Grid>
							<Grid item xs={1}>
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
