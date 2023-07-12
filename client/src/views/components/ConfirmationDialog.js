import { forwardRef } from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	DialogContentText,
	Slide,
	useTheme
} from '@mui/material';
import SubmitButton from './SubmitButton';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const ConfirmationDialog = ({
	open = false,
	setClosed,
	title = 'Please Confirm You Wish to Continue',
	textContent,
	onConfirm,
	onCancel,
	confirmButtonTitle = 'Confirm',
	cancelButtonTitle = 'Cancel'
}) => {
	const theme = useTheme();
	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={setClosed}
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						{textContent}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<SubmitButton
						onClick={onCancel}
						title={cancelButtonTitle}
						customStyle={{ backgroundColor: theme.palette.error.main }}
					/>
					<SubmitButton onClick={onConfirm} title={confirmButtonTitle} />
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ConfirmationDialog;
