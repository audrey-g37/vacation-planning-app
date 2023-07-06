import { Autocomplete as AutocompleteInput, TextField } from '@mui/material';
import { styled } from '@mui/system';

const Autocomplete = ({ options = [], label = '', onChange, onBlur, value, name }) => {
	const GroupHeader = styled('div')(({ theme }) => ({
		position: 'sticky',
		top: '-8px',
		padding: '4px 10px',
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.text.secondary
	}));

	const GroupItems = styled('ul')({
		padding: 0
	});

	const sortedOptions = options.map((option) => {
		const firstLetter = option.label[0].toUpperCase();
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
			...option
		};
	});

	const valueToShow =
		sortedOptions.find((option) => option.value === value || option.label === value)?.label ||
		'';

	return (
		<AutocompleteInput
			id={name}
			options={sortedOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
			groupBy={(option) => option.firstLetter}
			getOptionLabel={(option) => option.label || option}
			sx={{ '& .MuiInputBase-root': { padding: '1.5px' } }}
			onBlur={onBlur}
			value={valueToShow}
			isOptionEqualToValue={(option, value) => option.label === value}
			onChange={(event) => {
				const { textContent } = event.target;
				if (textContent) {
					const selectedOption = options.find((option) => option.label === textContent);
					onChange(name, selectedOption.value || selectedOption.label);
				} else {
					onChange(name, '');
				}
			}}
			renderInput={(params) => <TextField {...params} label={label} value={value} />}
			renderGroup={(params) => {
				return (
					<li key={params.key}>
						<GroupHeader>{params.group}</GroupHeader>
						<GroupItems>{params.children}</GroupItems>
					</li>
				);
			}}
		/>
	);
};

export default Autocomplete;
