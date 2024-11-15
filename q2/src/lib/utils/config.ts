const _config = {
	route: process.env.ROUTE,
	nodeEnv: process.env.NODE_ENV,
	resendApiKey: process.env.RESEND_API_KEY,
};

export const config = Object.freeze(_config);
