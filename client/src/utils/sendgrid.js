import axios from 'axios';

const templateIDs = {
	'join-grip-friend-request': 'd-cb9ce5e879584331aeca8106338b10a2'
};

const sendEmailMessage = async (idType, data) => {
	if (templateIDs[idType]) {
		data = { ...data, templateID: templateIDs[idType] };
	}
	let axiosObj = {
		method: 'post',
		baseURL: 'https://grip.webappsbyaudreyapi.dev/api/sendgrid/send',
		data: data
	};

	await axios(axiosObj);
};

export { sendEmailMessage };
