import { forwardRef } from 'react';
import {
	Grid,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
	useTheme
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
	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={setClosed}
			aria-describedby='alert-dialog-slide-description'
		>
			<Grid container spacing={theme.spacing()} sx={{ flexDirection: 'column' }}>
				<Grid item>
					<DialogTitle sx={{ color: theme.palette.text.secondary }}>{title}</DialogTitle>
				</Grid>
				<Grid item>
					<DialogContent>
						<CustomTypography textContent={textContent} />
					</DialogContent>
				</Grid>
				<Grid item>
					<DialogActions>
						<Grid
							container
							spacing={theme.spacing()}
							sx={{ justifyContent: 'flex-end' }}
						>
							<Grid item>
								<SubmitButton
									onClick={onCancel}
									title={cancelButtonTitle}
									customButtonStyle={{
										'backgroundColor': theme.palette.error.main,
										':hover': {
											backgroundColor: theme.palette.error.dark
										}
									}}
								/>
							</Grid>
							<Grid item>
								<SubmitButton onClick={onConfirm} title={confirmButtonTitle} />
							</Grid>
						</Grid>
					</DialogActions>
				</Grid>
			</Grid>
		</Dialog>
	);
};

export default ConfirmationDialog;
