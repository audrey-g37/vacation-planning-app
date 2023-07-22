import axios from 'axios';

const baseServerUrl = 'https://grip.webappsbyaudreyapi.dev/api';

const emailProps = {
	'join-grip-friend-request': {
		templateID: 'd-cb9ce5e879584331aeca8106338b10a2',
		urlParams: '/send'
	}
};

const sendEmailMessage = async (idType, data) => {
	if (emailProps[idType]?.templateID) {
		data = { ...data, templateID: emailProps[idType].templateID };
	}
	let axiosObj = {
		method: 'post',
		baseURL: `${baseServerUrl}/sendgrid`,
		headers: {
			'Content-Type': 'application/json'
		},
		timeout: 2000,
		data: data
	};
	if (emailProps[idType]?.urlParams) {
		axiosObj = { ...axiosObj, url: emailProps[idType].urlParams };
	}

	await axios(axiosObj);
};

export { sendEmailMessage };
