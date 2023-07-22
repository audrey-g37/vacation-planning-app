const formatValue = ({ type, value, subField, getValue, dateObj = false }) => {
	const subFieldTypes = {
		'trip.address': () =>
			`${value.city ? (value.state || value.country ? value.city + ', ' : value.city) : ''} ${
				value.state ? (value.country ? value.state + ', ' : value.state) : ''
			} ${value.country ? value.country : ''}`,
		'requestedByUserID': () => `${value.firstName} ${value.lastName}`,
		'pendingApprovalUserID': () => (value ? `${value.firstName} ${value.lastName}` : '')
	};
	const formatTypes = {
		date: () => {
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			return dateObj
				? value
					? new Date(+value)
					: undefined
				: value
				? new Date(+value).toLocaleString(undefined, options)
				: '';
		},
		subField: () => (subFieldTypes[subField] ? subFieldTypes[subField]() : getValue(value))
	};
	return formatTypes[type] && formatTypes[type]();
};

export { formatValue };
