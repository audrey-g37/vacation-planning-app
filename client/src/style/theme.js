import { createTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';
const { grey } = colors;
const theme = (mode) => {
	const darkMode = {
		// compound for the 3 (base color is text secondary)
		primary: {
			// text and links (not form labels)
			main: '#FFD99C',
			// hover on links
			light: '#F09C16',
			dark: '#3D805F'
		},
		secondary: {
			main: '#BAF9FF',
			light: '#DBFCFF',
			dark: '#95C7CC'
		},
		text: {
			// titles of forms, buttons, helper text
			primary: '#B5FFD1',
			// form input labels
			secondary: '#FFB087',
			disabled: '#FAEEEB'
		},
		action: {
			// color when something has been clicked/selected
			selected: '#B5FFD1'
		},
		background: grey[900],
		navBackground: grey[700]
	};
	const lightMode = {
		primary: {
			// text and links (not form labels)
			main: '#1477A8',
			// hover on links
			light: '#1FB4FF',
			dark: '#027060'
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
		background: grey[50],
		navBackground: grey[300]
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
