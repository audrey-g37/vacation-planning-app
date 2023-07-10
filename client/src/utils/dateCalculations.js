const possibleTimeValues = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

const convertToMilliseconds = (numberType, number) => {
	const numberTypes = {
		seconds: Math.floor(number * 1000),
		minutes: Math.floor(number * 60000),
		hours: Math.floor(number * 3600000),
		days: Math.floor(number * 86400000),
		weeks: Math.floor(number * 604800000),
		months: Math.floor(number * (604800000 * 4.345)),
		years: Math.floor(number * (604800000 * 4.345 * 12))
	};
	return numberTypes[numberType];
};

const convertFromMilliseconds = (returnType, milliseconds) => {
	const returnTypes = {
		seconds: Math.floor(milliseconds / 1000),
		minutes: Math.floor(milliseconds / 60000),
		hours: Math.floor(milliseconds / 3600000),
		days: Math.floor(milliseconds / 86400000),
		weeks: Math.floor(milliseconds / 604800000),
		months: Math.floor(milliseconds / (604800000 * 4.345)),
		years: Math.floor(milliseconds / (604800000 * 4.345 * 12))
	};
	return returnTypes[returnType];
};

const calculateRemainingFromSubtraction = (original, subtract) => {
	let existingMilliseconds = original.number;
	let accountForMilliseconds = subtract.number;

	if (original.numberType !== 'milliseconds') {
		existingMilliseconds = convertToMilliseconds(original.numberType, original.number);
	}
	if (subtract.numberType !== 'milliseconds') {
		accountForMilliseconds = convertToMilliseconds(subtract.numberType, subtract.number);
	}
	let remainingTime = existingMilliseconds - accountForMilliseconds;

	if (original.numberType !== 'milliseconds') {
		remainingTime = convertFromMilliseconds(
			original.numberType,
			existingMilliseconds - accountForMilliseconds
		);
	}

	return remainingTime;
};

const setNewTimeRemaining = (timeRemainingObj, key) => {
	const nextKey = {
		milliseconds: 'seconds',
		seconds: 'minutes',
		minutes: 'hours',
		hours: 'days',
		days: 'weeks',
		weeks: 'months',
		months: 'years'
	};
	let original = {
		numberType: key,
		number: timeRemainingObj[key]
	};
	let subtract = {
		numberType: nextKey[key],
		number: timeRemainingObj[nextKey[key]]
	};
	if (subtract.number) {
		const newValue = calculateRemainingFromSubtraction(original, subtract);
		return newValue;
	}
};

const setTimeDisplayString = (timeObj, maxNumUnits = 3) => {
	const { seconds, minutes, hours, days, weeks, months, years } = timeObj;

	let displayString = {
		string: '',
		unitsIncluded: []
	};
	let { string, unitsIncluded } = displayString;
	if (years > 0) {
		string = `${years + (years > 1 ? ' years' : ' year')} `;
		unitsIncluded.push('years');
	}
	if (months > 0) {
		string += `${months + (months > 1 ? ' months' : ' month')} `;
		unitsIncluded.push('months');
	}
	if (weeks > 0) {
		string += `${weeks + (weeks > 1 ? ' weeks' : ' week')} `;
		unitsIncluded.push('weeks');
	}
	if (days > 0) {
		string += `${days + (days > 1 ? ' days' : ' day')} `;
		unitsIncluded.push('days');
	}
	if (hours > 0) {
		string += `${hours + (hours > 1 ? ' hours' : ' hour')} `;
		unitsIncluded.push('hours');
	}
	if (minutes > 0) {
		string += `${minutes + (minutes > 1 ? ' minutes' : ' minute')} `;
		unitsIncluded.push('minutes');
	}
	if (seconds > 0) {
		string += `${seconds + (seconds > 1 ? ' seconds' : ' second')} `;
		unitsIncluded.push('seconds');
	}
	maxNumUnits = maxNumUnits > unitsIncluded.length ? unitsIncluded.length : maxNumUnits;
	let displayUnits = unitsIncluded.splice(0, maxNumUnits);
	let newString = ``;
	for (let [index, unit] of displayUnits.entries()) {
		// slicing the 's' off the units
		let textUnit = string.includes(unit) ? unit : unit.slice(0, unit.length - 1);
		if (maxNumUnits > 1 && index === maxNumUnits - 1) {
			newString = `${newString + 'and ' + timeObj[unit] + ' ' + textUnit}`;
		} else {
			newString = `${(newString +=
				timeObj[unit] + ' ' + textUnit + (maxNumUnits > 2 ? ', ' : ' '))}`;
		}
	}
	string = newString;
	displayString = {
		...displayString,
		string: string.trim(),
		unitsIncluded: unitsIncluded
	};
	return { ...displayString };
};

const calculateAmountOfTime = (numMilliseconds, unitsToDisplay = 3) => {
	let timeRemaining = {
		milliseconds: numMilliseconds
	};

	for (let key of possibleTimeValues) {
		const value = convertFromMilliseconds(key, timeRemaining.milliseconds);
		if (value > 0) {
			const originalMilliseconds = {
				numberType: 'milliseconds',
				number: timeRemaining.milliseconds
			};
			const subtractValue = {
				numberType: key,
				number: value
			};
			const newMilliseconds = calculateRemainingFromSubtraction(
				originalMilliseconds,
				subtractValue
			);
			timeRemaining = {
				...timeRemaining,
				[key]: value,
				milliseconds: newMilliseconds
			};
		}
	}
	const displayObj = setTimeDisplayString(timeRemaining, unitsToDisplay);
	return { ...timeRemaining, ...displayObj };
};

export { calculateAmountOfTime };
