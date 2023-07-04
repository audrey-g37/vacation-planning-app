import { CircularProgress, Grid, useTheme } from '@mui/material/';

const CircularLoader = () => {
	const theme = useTheme();
	return (
		<Grid
			container
			sx={{
				justifyContent: 'center',
				alignItems: 'center',
				height: '80vh',
				position: 'absolute'
			}}
		>
			<Grid item>
				<CircularProgress sx={{ color: theme.palette.text.primary }} />
			</Grid>
		</Grid>
	);
};

export default CircularLoader;
