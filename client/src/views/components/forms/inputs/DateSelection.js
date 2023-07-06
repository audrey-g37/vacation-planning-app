import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const DateSelection = ({ placeholder = '', name, value, onChange, onBlur, disabled }) => {
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
				render
			/>
		</LocalizationProvider>
	);
};

export default DateSelection;
