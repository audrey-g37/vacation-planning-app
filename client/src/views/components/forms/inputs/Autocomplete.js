import { Autocomplete as AutocompleteInput, TextField } from '@mui/material';
import { styled } from '@mui/system';

const Autocomplete = ({
	options = [],
	label = '',
	//* use setFieldValue for onChange with Formik
	onChange,
	onBlur,
	value,
	name,
	group = true
}) => {
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
		const firstLetter = option.label?.[0]?.toUpperCase() || option[0].toUpperCase();
		let toReturn = {
			firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter
		};
		toReturn = option.label ? { ...toReturn, ...option } : { ...toReturn, label: option };
		return toReturn;
	});

	const valueToShow =
		sortedOptions.find(
			(option) => option.value === value || option.label === value || option === value
		)?.label || '';

	return (
		<AutocompleteInput
			id={name}
			options={
				group
					? sortedOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))
					: sortedOptions
			}
			groupBy={(option) => option.firstLetter}
			getOptionLabel={(option) => option.label || option}
			sx={{ '& .MuiInputBase-root': { padding: '1.5px' } }}
			onBlur={onBlur}
			value={valueToShow}
			isOptionEqualToValue={(option, value) => option.label === value || option === value}
			onChange={(event) => {
				const { textContent } = event.target;
				if (textContent) {
					const selectedOption = options.find(
						(option) => option.label === textContent || option === textContent
					);
					onChange(name, selectedOption.value || selectedOption.label || selectedOption);
				} else {
					onChange(name, '');
				}
			}}
			renderInput={(params) => <TextField {...params} label={label} value={value} />}
			renderGroup={(params) => {
				return (
					<li key={params.key}>
						{group && <GroupHeader>{params.group}</GroupHeader>}
						<GroupItems>{params.children}</GroupItems>
					</li>
				);
			}}
		/>
	);
};

export default Autocomplete;
