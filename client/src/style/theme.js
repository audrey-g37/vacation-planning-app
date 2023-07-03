import { createTheme } from '@mui/material/styles/index';
import * as colors from '@mui/material/colors/index';
const { grey, blueGrey, teal } = colors;
const theme = (mode) => {
	const darkMode = {
		// compound for the 3 (base color is text secondary)
		primary: {
			// text and links (not form labels)
			main: '#FABAA2',
			// hover on links and menu items in collapsed menu custom component
			light: '#ffffff',
			// hover on buttons - match text secondary
			dark: '#FAD88D'
		},
		// put background in color wheel and split complementary
		secondary: {
			// background color of the table header
			main: '#4F403B',
			light: '#9C857C',
			dark: '#393B2B'
		},
		text: {
			// titles of forms, buttons, helper text
			primary: '#FFBFA8',
			// form input labels, table header text
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
			// hover on links and menu items in collapsed menu custom component
			light: '#1B9655',
			// hover on buttons - match text secondary
			dark: '#348F28'
		},
		// put background in color wheel and split complementary
		secondary: {
			// background color of the table header
			main: '#E4E7EB',
			light: '#B3B1A1',
			dark: '#A1A8B3'
		},
		text: {
			// button background, helper text
			primary: '#223FAD',
			// form input labels, table header text
			secondary: '#348F28',
			disabled: '#eeeeee'
		},
		action: {
			// color when something has been clicked/selected - match text.primary
			selected: '#55788A'
		},
		background: '#ffffff',
		navBackground: grey[100]
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
