import { TextField } from '@mui/material';

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
		/>
	);
};

export default Text;
