const formatDate = (date: string): string => {
	const d = new Date(date);
	return d.toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};

const getAvatarLetter = (from: string): string => {
	return from.charAt(0).toUpperCase();
};

const loadPersistedState = () => {
	const savedState = localStorage.getItem("emailAppState");
	if (savedState) {
		const { readEmails, favoriteEmails } = JSON.parse(savedState);
		return { readEmails, favoriteEmails };
	}
	return { readEmails: new Set(), favoriteEmails: new Set() };
};

const persistState = (readEmails: Set<string>, favoriteEmails: Set<string>) => {
	localStorage.setItem(
		"emailAppState",
		JSON.stringify({
			readEmails: Array.from(readEmails),
			favoriteEmails: Array.from(favoriteEmails),
		})
	);
};

export { persistState, loadPersistedState, getAvatarLetter, formatDate };
