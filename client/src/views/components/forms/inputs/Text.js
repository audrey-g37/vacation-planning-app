import { TextField, useTheme } from '@mui/material';

const Text = ({
	placeholder = '',
	name,
	type,
	value = '',
	onChange,
	multiline = false,
	minRows = 1,
	error,
	disabled,
	size = 'small'
}) => {
	const theme = useTheme();
	const customStyle = {
		WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background} inset`,
		WebkitTextFillColor: `${theme.palette.text.primary}`
	};
	return (
		<TextField
			size={size}
			type={type}
			placeholder={placeholder}
			name={name}
			value={value}
			onChange={onChange}
			error={error}
			disabled={disabled}
			multiline={multiline}
			minRows={minRows}
			inputProps={{ style: customStyle }}
		/>
	);
};

export default Text;