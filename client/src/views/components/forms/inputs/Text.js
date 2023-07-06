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
	const customStyle = {
		WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background} inset`,
		WebkitTextFillColor: `${theme.palette.text.primary}`
	};
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
				inputProps={{ style: customStyle }}
				InputProps={{
					[inputAdornment?.position === 'end' ? 'endAdornment' : 'startAdornment']:
						inputAdornment?.icon,
					style: {
						backgroundColor: theme.palette.background
					}
				}}
			/>
		</>
	);
};

export default Text;
