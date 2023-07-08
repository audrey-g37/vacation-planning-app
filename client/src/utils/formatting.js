const formatValue = ({ type, value, subField, getValue, dateObj = false }) => {
	const subFieldTypes = {
		'trip.address': () =>
			`${value.city ? value.city + ', ' : ''} ${value.state ? value.state + ', ' : ''} ${
				value.country ? value.country : ''
			}`
	};
	const formatTypes = {
		date: () => {
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			return dateObj
				? value
					? new Date(+value)
					: undefined
				: new Date(+value).toLocaleString(undefined, options);
		},
		subField: () => (subFieldTypes[subField] ? subFieldTypes[subField]() : getValue(value))
	};
	return formatTypes[type] && formatTypes[type]();
};

export { formatValue };
