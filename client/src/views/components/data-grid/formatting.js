const formatValue = ({ type, value, subField, getValue }) => {
	const subFieldTypes = {
		'trip.address': () =>
			`${value.city ? value.city + ', ' : ''} ${value.state ? value.state + ', ' : ''} ${
				value.country ? value.country : ''
			}`
	};
	const formatTypes = {
		date: () => (value ? new Date(+value) : undefined),
		subField: () => (subFieldTypes[subField] ? subFieldTypes[subField]() : getValue(value))
	};
	return formatTypes[type] && formatTypes[type]();
};

export { formatValue };
