import { FormControl, FormLabel, FormHelperText, useTheme } from '@mui/material';

import Text from './Text.js';

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
			<FormLabel
				sx={{
					textAlign: 'left'
				}}
			>{`${label}${required ? '*' : ''}`}</FormLabel>
			{componentTypes[componentType]}
			{helperText && (
				<FormHelperText sx={{ color: theme.palette.text.primary }}>
					{helperText}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default FormInput;
