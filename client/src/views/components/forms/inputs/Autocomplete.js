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
	group = true,
	multiple = false
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

	let valueToShow;

	const sortedOptions = options.reduce((prev, next) => {
		// removing any already selected items
		if (
			multiple &&
			(value.includes(next.value) || value.includes(next.label) || value.includes(next))
		) {
			return prev;
		}
		const firstLetter = next.label?.[0]?.toUpperCase() || next[0].toUpperCase();
		let toReturn = {
			firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter
		};
		toReturn = next.label ? { ...toReturn, ...next } : { ...toReturn, label: next };
		prev.push(toReturn);
		return prev;
	}, []);

	// setting the display value
	if (!multiple) {
		valueToShow =
			sortedOptions.find(
				(option) => option.value === value || option.label === value || option === value
			)?.label || '';
	} else {
		valueToShow = value.map(
			(value) =>
				options.find(
					(option) => option.value === value || option.label === value || option === value
				)?.label || ''
		);
		valueToShow = !valueToShow ? [] : valueToShow;
	}

	return (
		<AutocompleteInput
			id={name}
			multiple={multiple}
			options={
				group
					? sortedOptions.sort((a, b) => -b.firstLetter?.localeCompare(a.firstLetter))
					: sortedOptions
			}
			groupBy={(option) => option.firstLetter}
			getOptionLabel={(option) => option.label || option}
			sx={{ '& .MuiInputBase-root': { padding: '1.5px' } }}
			onBlur={onBlur}
			value={valueToShow}
			isOptionEqualToValue={(option, value) => option?.label === value || option === value}
			onChange={(event) => {
				const { textContent } = event.target;
				if (textContent) {
					const selectedOption = options.find(
						(option) => option.label === textContent || option === textContent
					);
					let valueToSend =
						selectedOption.value || selectedOption.label || selectedOption;
					onChange(name, multiple ? [...value, valueToSend] : valueToSend);
				} else {
					const { classList, parentElement } = event.target;
					const classListArray = Array.from(classList);
					const parentClassListArray = Array.from(parentElement.classList);

					// an individual 'clear' button was clicked
					if (
						classListArray.includes('MuiChip-deleteIcon') ||
						parentClassListArray.includes('MuiChip-deleteIcon')
					) {
						const outerText =
							parentElement.outerText || parentElement.parentElement.outerText;

						let matchingValue = options.find(
							(option) =>
								option?.value === outerText ||
								option?.label === outerText ||
								option === outerText
						);
						matchingValue =
							matchingValue?.value || matchingValue?.label || matchingValue;
						const updatedValue = value.filter(
							(valueToTest) => valueToTest !== matchingValue
						);

						onChange(name, multiple ? [...updatedValue] || [] : '');
					}

					// whole selection clear button is clicked
					else if (
						parentClassListArray.includes('MuiAutocomplete-clearIndicator') ||
						classListArray.includes('MuiAutocomplete-clearIndicator')
					) {
						onChange(name, multiple ? [] : '');
					} else {
						onChange(name, multiple ? [...value] : '');
					}
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
