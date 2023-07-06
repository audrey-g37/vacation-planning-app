import { InputAdornment, TextField, useTheme } from '@mui/material';

const Text = ({
	placeholder = '',
	name,
	type,
	value = '',
	onChange,
	onBlur,
	multiline = false,
	minRows = 1,
	error,
	disabled,
	size = 'small',
	inputAdornment
}) => {
	const theme = useTheme();
	return (
		<>
			<TextField
				size={size}
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				error={error}
				disabled={disabled}
				multiline={multiline}
				minRows={minRows}
				InputProps={{
					[inputAdornment?.position === 'end' ? 'endAdornment' : 'startAdornment']:
						inputAdornment?.icon
				}}
			/>
		</>
	);
};

export default Text;
