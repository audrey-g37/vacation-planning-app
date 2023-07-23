import { forwardRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Slide, useTheme } from '@mui/material';
import SubmitButton from './SubmitButton';
import CustomTypography from './CustomTypography';

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
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={setClosed}
			aria-labelledby='alert-dialog-slide-description'
		>
			<DialogTitle sx={{ color: theme.palette.text.secondary }}>{title}</DialogTitle>
			<DialogContent>
				<CustomTypography textContent={textContent} />
			</DialogContent>
			<DialogActions>
				<SubmitButton onClick={onCancel} title={cancelButtonTitle} useErrorButton={true} />
				<SubmitButton onClick={onConfirm} title={confirmButtonTitle} />
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmationDialog;
