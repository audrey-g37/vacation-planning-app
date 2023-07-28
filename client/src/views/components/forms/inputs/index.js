import { FormControl, FormLabel, FormHelperText, useTheme } from '@mui/material';

import Text from './Text';
import DateSelection from './DateSelection';
import DateTime from './DateTime';
import Autocomplete from './Autocomplete';
import Switch from './Switch';

const FormInput = ({
	componentType,
	componentProps = {},
	label,
	required = false,
	error = false,
	helperText,
	disabled = false
}) => {
	const theme = useTheme();
	const componentTypes = {
		text: <Text {...componentProps} />,
		switch: <Switch {...componentProps} />,
		date: <DateSelection {...componentProps} />,
		dateTime: <DateTime {...componentProps} />,
		autocomplete: <Autocomplete {...componentProps} />
	};

	return (
		<FormControl
			fullWidth
			disabled={disabled}
			sx={{
				margin: '0.25rem 0'
			}}
		>
			<FormLabel
				sx={{
					textAlign: 'left',
					color: error ? theme.palette.text.error : theme.palette.primary.dark
				}}
			>{`${label}${required ? '*' : ''}`}</FormLabel>
			{componentTypes[componentType]}
			{helperText && (
				<FormHelperText
					sx={{ color: error ? theme.palette.text.error : theme.palette.primary.dark }}
				>
					{helperText}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default FormInput;
