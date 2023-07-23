import { Snackbar, Box, IconButton, useTheme, Slide } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import useAuth from 'hooks/useAuth';

const Alert = () => {
	const theme = useTheme();
	const { alert, initialAlertState, setAlert } = useAuth();
	const { open, message, severity, anchorOrigin, allowClose, autoHideDuration } = alert;

	const alertSeverities = {
		success: theme.palette.success.main,
		error: theme.palette.error.main,
		info: theme.palette.info.main
	};

	const setClosed = () => setAlert(initialAlertState);

	return (
		<Box sx={{ width: '100%' }}>
			<Snackbar
				open={open}
				TransitionComponent={Slide}
				action={
					allowClose ? (
						<IconButton
							aria-label='close'
							color='inherit'
							size='small'
							onClick={setClosed}
						>
							<CloseIcon fontSize='inherit' />
						</IconButton>
					) : undefined
				}
				anchorOrigin={anchorOrigin}
				onClose={setClosed}
				autoHideDuration={autoHideDuration}
				message={message}
				sx={{
					'& .MuiSnackbarContent-root': { backgroundColor: alertSeverities[severity] }
				}}
			/>
		</Box>
	);
};
export default Alert;
