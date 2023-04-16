import { FormControl, FormLabel, FormHelperText, useTheme } from '@mui/material';

import Text from './Text';

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
	componentProps = { ...componentProps, error: error, disabled: disabled };
	const componentTypes = {
		text: <Text {...componentProps} />
	};

	return (
		<FormControl fullWidth error={error} disabled={disabled} sx={{ margin: '0.25rem 0' }}>
			<FormLabel sx={{ textAlign: 'left', color: theme.palette.mainDark }}>{`${label}${
				required ? '*' : ''
			}`}</FormLabel>
			{componentTypes[componentType]}
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

export default FormInput;
