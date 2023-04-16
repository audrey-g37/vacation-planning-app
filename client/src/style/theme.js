import { createTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';
const { grey, cyan, orange, pink, blue, teal } = colors;
const theme = createTheme({
	palette: {
		white: '#ffffff',
		black: '#000000',
		greyDark: grey[500],
		greyLight: grey[100],
		contrast1: pink[300],
		contrast2: orange['A200'],
		mainLight: cyan[100],
		main: cyan[600],
		linkHover: cyan[800],
		mainDark: cyan[900],
		linkDark: blue[800]
	}
});

export default theme;
