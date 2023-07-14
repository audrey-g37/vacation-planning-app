import axios from 'axios';

const emailProps = {
	'join-grip-friend-request': {
		templateID: 'd-cb9ce5e879584331aeca8106338b10a2',
		urlParams: '/send'
	}
};

const sendEmailMessage = async (idType, data) => {
	if (emailProps[idType]?.templateID) {
		data = { ...data, templateID: templateIDs[idType].templateID };
	}
	let axiosObj = {
		method: 'post',
		baseUrl: `https://grip.webappsbyaudreyapi.dev/sendgrid`,
		headers: {
			'Content-Type': 'application/json'
		},
		timeout: 2000
	};
	if (emailProps[idType]?.urlParams) {
		axiosObj = { ...axiosObj, url: emailProps[idType].urlParams };
	}

	await axios(axiosObj);
};

export { sendEmailMessage };
