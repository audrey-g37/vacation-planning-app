const sortTrips = ({ data, displayLimitNum, showOldTrips = true, oldToNew = false }) => {
	if (!showOldTrips) {
		data = data.reduce((prev, next) => {
			let existing = prev;
			const today = new Date(new Date()).valueOf();
			const startDate = new Date(+next.startDate).valueOf();
			if (!(startDate < today)) {
				existing.push(next);
			}
			return existing;
		}, []);
	}

	data = data.sort((a, b) => {
		const today = new Date(new Date()).valueOf();
		const startDateA = new Date(+a.startDate).valueOf();
		const startDateB = new Date(+b.startDate).valueOf();
		const closenessA = startDateA - today;
		const closenessB = startDateB - today;

		return oldToNew ? (closenessA > closenessB ? 1 : -1) : closenessA < closenessB ? 1 : -1;
	});
	if (displayLimitNum) {
		data = data.splice(
			0,
			data.length > displayLimitNum
				? data.length - (data.length - displayLimitNum)
				: data.length
		);
	}
	return data;
};

//* sortingBy = firstName, lastName, email
const sortFriends = ({ data, displayLimitNum, fieldName }) => {
	data = data.sort((a, b) => a[fieldName].localeCompare(b[fieldName]));
	if (displayLimitNum) {
		data = data.splice(
			0,
			data.length > displayLimitNum
				? data.length - (data.length - displayLimitNum)
				: data.length
		);
	}
	return data;
};

export { sortTrips, sortFriends };
