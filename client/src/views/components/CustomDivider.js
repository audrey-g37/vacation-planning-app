import { Divider, useTheme } from '@mui/material';

const CustomDivider = ({ margin = '0' }) => {
	const theme = useTheme();
	return (
		<Divider
			sx={{ margin: margin, borderWidth: '0.5px', color: theme.palette.custom.navBackground }}
		/>
	);
};

export default CustomDivider;
