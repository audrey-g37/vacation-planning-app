import { Typography, useTheme, useMediaQuery } from '@mui/material';

const CustomTypography = ({ variant, textContent }) => {
	const theme = useTheme();
	const medAndUp = useMediaQuery(theme.breakpoints.up('sm'));

	return <Typography variant={variant || medAndUp ? 'body1' : 'body2'}>{textContent}</Typography>;
};

export default CustomTypography;
