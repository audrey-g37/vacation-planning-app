const sortTrips = ({ tripData, displayLimitNum, showOldTrips = true, oldToNew = false }) => {
	if (!showOldTrips) {
		tripData = tripData.reduce((prev, next) => {
			let existing = prev;
			const today = new Date(new Date()).valueOf();
			const startDate = new Date(+next.startDate).valueOf();
			if (!(startDate < today)) {
				existing.push(next);
			}
			return existing;
		}, []);
	}

	tripData = tripData.sort((a, b) => {
		const today = new Date(new Date()).valueOf();
		const startDateA = new Date(+a.startDate).valueOf();
		const startDateB = new Date(+b.startDate).valueOf();
		const closenessA = startDateA - today;
		const closenessB = startDateB - today;

		return oldToNew ? (closenessA > closenessB ? 1 : -1) : closenessA < closenessB ? 1 : -1;
	});
	if (displayLimitNum) {
		tripData = tripData.splice(
			0,
			tripData.length > displayLimitNum
				? tripData.length - (tripData.length - displayLimitNum)
				: tripData.length
		);
	}
	return tripData;
};

export { sortTrips };
