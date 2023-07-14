const createLog = (logObj = {}) => {
	const todayTimestamp = () => new Date();
	const throwError = logObj.throwError || true;
	logObj = {
		message: logObj.message || 'Server Log ---',
		date: todayTimestamp(),
		...logObj
	};
	if (logObj.specificError) {
		console.error(logObj);
		if (throwError) {
			throw new Error(
				`The system encountered a problem. Please check the logs for more information.`
			);
		}
	} else {
		console.log(logObj);
	}
};

module.exports = createLog;
