import { useTheme } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const DateTime = ({ placeholder = '', name, value, onChange, onBlur, disabled }) => {
	const theme = useTheme();
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DateTimePicker
				label={placeholder}
				defaultValue={dayjs(value)}
				onChange={(event) => {
					if (event) {
						const { $d: dateObj } = event;
						onChange(name, dateObj);
					} else {
						onChange(name, '');
					}
					onBlur({ [name]: true });
				}}
				disabled={disabled}
				sx={{ '& .MuiInputBase-input': { padding: '9px' } }}
			/>
		</LocalizationProvider>
	);
};

export default DateTime;
