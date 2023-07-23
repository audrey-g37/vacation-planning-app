import { createTheme } from '@mui/material/styles/index';
import * as colors from '@mui/material/colors/index';
const { grey, blueGrey } = colors;
const theme = (mode) => {
	const darkMode = {
		// split comp for the 3 (base color is primary main)
		primary: {
			// form input outline when selected (not form labels), title of project, main card title and 'new' icon in main card, collapsed menu icon color/outline, circular loader
			main: '#B3E1FF',
			// form labels, helper text (if no error)
			dark: '#FFE999'
		},
		secondary: {
			// background color of the table header
			main: '#393635'
		},
		error: {
			dark: '#FDC4AC',
			main: '#FFA27A'
		},
		text: {
			// custom typography default (table row text color), background color of submit button on hover
			primary: '#FDFDFD',
			// hover on links, draggable dialog form title and close icon, table header row text color, background color of submit button
			secondary: '#A6FFF1',
			// font color of submit button
			dark: '#000000',
			// font color of disabled button
			disabled: '#FAEEEB',
			// helper text color if error
			error: '#EEFF00'
		},
		background: {
			paper: grey[800]
		},
		custom: {
			navBackground: grey[900]
		}
	};
	const lightMode = {
		primary: {
			main: '#871F14',
			dark: '#87451B'
		},
		secondary: {
			main: '#E1E1E1'
		},
		error: {
			main: '#D32F2F',
			dark: '#871E1E'
		},
		text: {
			primary: '#000000',
			secondary: '#045D60',
			dark: '#E4E7EB',
			disabled: '#000000',
			error: '#B60000'
		},
		background: {
			paper: '#ffffff'
		},
		custom: {
			navBackground: grey[100]
		}
	};
	const typography = {
		fontFamily: ['PT Sans', 'sans-serif'].join(','),
		subtitle1: { fontSize: 18 }
	};
	let palette = {
		mode: mode
	};
	palette = mode === 'dark' ? { ...palette, ...darkMode } : { ...palette, ...lightMode };

	let themeToUse = createTheme({
		palette: palette,
		typography: typography,
		spacing: 8
	});
	return themeToUse;
};

export default theme;
