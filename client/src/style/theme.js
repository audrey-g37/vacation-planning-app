import { createTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';
const { grey, cyan, orange, pink, blue, teal } = colors;
const theme = createTheme({
	palette: {
		white: '#ffffff',
		black: '#000000',
		greyDark: grey[500],
		greyLight: grey[100],
		main: cyan[600],
		mainDark: cyan[900],
		mainLight: cyan[100],
		contrast2: orange['A200'],
		contrast1: pink[300],
		linkDark: blue[800],
		linkHover: cyan[700]
	}
});

export default theme;
