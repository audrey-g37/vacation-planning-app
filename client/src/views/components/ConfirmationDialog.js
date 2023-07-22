import { forwardRef } from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
	Paper,
	useTheme,
	useMediaQuery
} from '@mui/material';
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
	const lgAndUp = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={lgAndUp ? Transition : undefined}
				PaperComponent={lgAndUp ? undefined : Paper}
				keepMounted
				onClose={setClosed}
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle sx={{ color: theme.palette.text.secondary }}>{title}</DialogTitle>
				<DialogContent>
					<CustomTypography textContent={textContent} />
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
