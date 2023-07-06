import { useTheme } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const DateSelection = ({ placeholder = '', name, value, onChange, onBlur, disabled }) => {
	const theme = useTheme();
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DatePicker
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

export default DateSelection;
