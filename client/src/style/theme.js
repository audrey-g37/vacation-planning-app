import { createTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';
const { grey, blueGrey, teal } = colors;
const theme = (mode) => {
	const darkMode = {
		// compound for the 3 (base color is text secondary)
		primary: {
			// text and links (not form labels)
			main: '#FAA484',
			// hover on links
			light: '#F09C16',
			// hover on buttons - match text.secondary
			dark: '#FAD88D'
		},
		secondary: {
			main: '#BAF9FF',
			light: '#DBFCFF',
			dark: '#95C7CC'
		},
		text: {
			// titles of forms, buttons, helper text
			primary: '#FFBFA8',
			// form input labels
			secondary: '#FAD88D',
			disabled: '#FAEEEB'
		},
		action: {
			// color when something has been clicked/selected - match text.primary
			selected: '#FFBFA8'
		},
		background: blueGrey[800],
		navBackground: blueGrey[700]
	};
	const lightMode = {
		primary: {
			// text and links (not form labels)
			main: '#1477A8',
			// hover on links
			light: '#1FB4FF',
			// hover on buttons - match text.secondary
			dark: '#28B599'
		},
		secondary: {
			main: '#D06F62',
			light: '#F07E4D',
			dark: '#702302'
		},
		text: {
			// titles of forms, buttons, helper text
			primary: '#55788A',
			// form input labels
			secondary: '#28B599',
			disabled: '#eeeeee'
		},
		action: {
			// color when something has been clicked/selected - match text.primary
			selected: '#55788A'
		},
		background: '#ffffff',
		navBackground: teal[50]
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
