import { Email, EmailBody } from "./types";

export const fetchEmails = async (): Promise<Email[]> => {
	const response = await fetch(`https://flipkart-email-mock.now.sh`);
	const data = await response.json();
	return data.list.map((email: Email) => ({
		...email,
		read: false,
		favorite: false,
	}));
};

export const fetchEmailBody = async (id: string): Promise<EmailBody> => {
	const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
	return await response.json();
};
