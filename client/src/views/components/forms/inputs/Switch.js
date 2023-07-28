import { Switch as SwitchInput } from '@mui/material';

const Switch = ({ name, value, onChange, onBlur, disabled }) => {
	return (
		<SwitchInput
			color='primary'
			disabled={disabled}
			onChange={onChange}
			onBlur={onBlur}
			name={name}
			value={value}
		/>
	);
};

export default Switch;
