const createLog = require('../middleware/logging');
const sgMailer = require('@sendgrid/mail');

sgMailer.setApiKey(process.env.SENDGRID_API_KEY);

// emailGroup is an array of objects - each object will be it's own email (has three properties: toEmails, ccEmails, bccEmails --- all should be an array of strings/email addresses)
const createEmailObj = ({ emailGroup, templateID, templateData }) => {
	const errorResponse = (err) => {
		createLog({
			message: `There was a problem with the createEmailObj function for sendgrid.`,
			emailGroup: { ...emailGroup },
			templateData: { ...templateData },
			templateID: templateID,
			specificError: err
		});
	};
	const successResponse = (emailObj) =>
		createLog({
			message: `Email object successfully created for sendgrid.`,
			emailObj: { ...emailObj, dynamic_template_data: { ...emailObj.dynamic_template_data } }
		});
	try {
		let emailObj = {
			from: {
				email: 'info@webappsbyaudrey.com',
				name: 'Audrey at GRIP'
			},
			personalizations: []
		};
		if (templateID) {
			emailObj = { ...emailObj, template_id: templateID };
		}
		if (templateData) {
			emailObj = { ...emailObj, dynamic_template_data: templateData };
		}
		let personalizations = [...emailObj.personalizations];
		for (let emailSet of emailGroup) {
			const { toEmails = [], ccEmails = [], bccEmails = [] } = emailSet;
			personalizations = [
				...personalizations,
				{
					to: toEmails.map((email) => (email = { email: email })),
					cc: ccEmails.map((email) => (email = { email: email })),
					bcc: bccEmails.map((email) => (email = { email: email }))
				}
			];
			emailObj = { ...emailObj, personalizations: personalizations };
		}
		successResponse(emailObj);
		return emailObj;
	} catch (err) {
		errorResponse(err);
	}
};

const sendEmailMessage = async (req, res) => {
	try {
		const { emailGroup, templateID, templateData, maxEmailsAllowed = 1000 } = req.body;
		const errorResponse = (err) => {
			createLog({
				message: `There was a problem with the sendMessage function for sendgrid.`,
				specificError: err
			});
		};
		const successResponse = (res) =>
			createLog({
				message: `Email sent successfully with sendgrid.`,
				response: res
			});

		let msgObj = createEmailObj({
			emailGroup: emailGroup,
			templateID: templateID,
			templateData: templateData
		});

		// sendgrid can only have 1000 personalizations in API call - checking for that maximum and sending in sections if needed
		if (msgObj.personalizations.length > maxEmailsAllowed) {
			const setsAllowed = Math.ceil(msgObj.personalizations.length / maxEmailsAllowed);
			let sectionObj = {};
			for (let i = 1; i <= setsAllowed; i++) {
				const sliceAt = i * maxEmailsAllowed;
				const priorSlice = sliceAt - maxEmailsAllowed;
				sectionObj = {
					...sectionObj,
					[`${i}`]: msgObj.personalizations.slice(priorSlice, sliceAt)
				};
			}
			for (const personalizationArraySection of Object.values(sectionObj)) {
				msgObj = {
					...msgObj,
					personalizations: personalizationArraySection
				};
				await sgMailer.send(msgObj, undefined, (err, res) =>
					err ? errorResponse(err) : successResponse(res)
				);
			}
		} else {
			await sgMailer.send(msgObj, undefined, (err, res) =>
				err ? errorResponse(err) : successResponse(res)
			);
		}
		return res.status(200);
	} catch (err) {
		errorResponse(err);
		return res.sendStatus(500);
	}
};

module.exports = sendEmailMessage;
