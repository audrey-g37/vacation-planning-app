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
			paper: blueGrey[800]
		},
		custom: {
			navBackground: blueGrey[700]
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
	let palette = {
		mode: mode
	};
	palette = mode === 'dark' ? { ...palette, ...darkMode } : { ...palette, ...lightMode };

	let themeToUse = createTheme({
		palette: palette,
		spacing: [0, 4, 8, 16, 32, 64]
	});
	themeToUse.spacing(4);
	return themeToUse;
};

export default theme;
