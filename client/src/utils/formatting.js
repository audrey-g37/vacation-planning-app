const formatValue = ({ type, value, subField, getValue, dateObj = false }) => {
	const subFieldTypes = {
		'trip.address': () =>
			`${value.city ? (value.state || value.country ? value.city + ', ' : value.city) : ''} ${
				value.state ? (value.country ? value.state + ', ' : value.state) : ''
			} ${value.country ? value.country : ''}`
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

const calculateAmountOfTime = (milliseconds) => {
	// starting with number of minutes
	let timeRemaining = { minutes: milliseconds / (1000 * 60) };

	// converting to hours
	if (timeRemaining.minutes >= 60) {
		const hoursRemaining = Math.floor(timeRemaining.minutes / 60);
		const additional = {
			minutes: Math.floor(timeRemaining.minutes - hoursRemaining * 60)
		};
		timeRemaining = {
			...timeRemaining,
			hours: hoursRemaining,
			...additional
		};
	}

	// converting to days
	if (timeRemaining.hours >= 24) {
		const daysRemaining = Math.floor(timeRemaining.hours / 24);
		const additional = {
			hours: Math.floor(timeRemaining.hours - daysRemaining * 24)
		};
		timeRemaining = { ...timeRemaining, days: daysRemaining, ...additional };
	}

	// converting to weeks
	if (timeRemaining.days >= 7) {
		const weeksRemaining = Math.floor(timeRemaining.days / 7);
		const additional = {
			days: Math.floor(timeRemaining.days - weeksRemaining * 7)
		};
		timeRemaining = {
			...timeRemaining,
			weeks: weeksRemaining,
			...additional
		};
	}

	// converting to months
	if (timeRemaining.weeks >= 4.345) {
		const monthsRemaining = Math.floor(timeRemaining.weeks / 4.345);
		const additional = {
			weeks: Math.floor(timeRemaining.weeks - monthsRemaining * 4.345)
		};
		timeRemaining = {
			...timeRemaining,
			months: monthsRemaining,
			...additional
		};
	}

	// converting to years
	if (timeRemaining.months >= 12) {
		const yearsRemaining = Math.floor(timeRemaining.months / 12);
		const additional = {
			months: Math.floor(timeRemaining.months - yearsRemaining * 12)
		};
		timeRemaining = {
			...timeRemaining,
			years: yearsRemaining,
			...additional
		};
	}
	const { minutes, hours, days, weeks, months, years } = timeRemaining;

	let displayString = ``;
	if (years > 0) {
		displayString = `${years + (years > 1 ? ' years' : ' year')}`;
		if (months > 0) {
			displayString += ` and ${months + (months > 1 ? ' months' : 'month')}`;
		}
	} else if (months > 0) {
		displayString = `${months + (months > 1 ? ' months' : ' month')}`;
		if (weeks > 0) {
			displayString += ` and ${weeks + (weeks > 1 ? ' weeks' : ' week')}`;
		}
	} else if (weeks > 0) {
		displayString = `${weeks + (weeks > 1 ? ' weeks' : ' week')}`;
		if (days > 0) {
			displayString += ` and ${days + (days > 1 ? ' days' : ' day')}`;
		}
	} else if (days > 0) {
		displayString = `${days + (days > 1 ? ' days' : ' day')}`;
		if (hours > 0) {
			displayString += ` and ${hours + (hours > 1 ? ' hours' : ' hour')}`;
		}
	} else if (hours > 0) {
		displayString = `${hours + (hours > 1 ? ' hours' : ' hour')}`;
		if (minutes > 0) {
			displayString += ` and ${minutes + (minutes > 1 ? ' minutes' : ' minute')}`;
		}
	} else {
		displayString = `${minutes} minutes`;
	}

	return { ...timeRemaining, displayString: displayString };
};

export { formatValue, calculateAmountOfTime };
