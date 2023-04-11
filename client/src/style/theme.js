import { createTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';
const { grey, cyan, orange, pink } = colors;
const theme = createTheme({
	palette: {
		white: '#ffffff',
		black: '#000000',
		greyDark: grey[500],
		greyLight: grey[100],
		main: cyan[600],
		mainDark: cyan[900],
		mainLight: cyan[100],
		textLight: '#ffffff',
		textDark: '#000000',
		contrast2: orange['A200'],
		contrast1: pink[300]
	}
});

export default theme;
