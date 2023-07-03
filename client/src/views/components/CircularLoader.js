import * as React from 'react';
import { Stack, CircularProgress, useTheme } from '@mui/material/';

const Loader = () => {
	const theme = useTheme();
	return <CircularProgress sx={{ color: theme.palette.primary.main }} />;
};

export default Loader;
