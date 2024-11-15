import { useState, useEffect } from "react";

import EmailList from "./components/EmailList";
import EmailBody from "./components/EmailBody";
import FilterButtons from "./components/FilterButtons";
import { fetchEmails, fetchEmailBody } from "./lib/api";
import { loadPersistedState, persistState } from "./lib/utils";
import { Email, EmailBody as EmailBodyType } from "./lib/types";

const App: React.FC = () => {
	const [emails, setEmails] = useState<Email[]>([]);
	const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
	const [emailBody, setEmailBody] = useState<EmailBodyType | null>(null);
	const [filter, setFilter] = useState<"all" | "unread" | "read" | "favorites">("all");
	const [readEmailsSet, setReadEmailsSet] = useState<Set<string>>(() => new Set(loadPersistedState().readEmails));
	const [favoriteEmailsSet, setFavoriteEmailsSet] = useState<Set<string>>(
		() => new Set(loadPersistedState().favoriteEmails)
	);

	useEffect(() => {
		const loadEmails = async () => {
			const emails = await fetchEmails();
			const enhancedEmails = emails.map((email) => ({
				...email,
				read: readEmailsSet.has(email.id),
				favorite: favoriteEmailsSet.has(email.id),
			}));
			setEmails(enhancedEmails);
		};
		loadEmails();
	}, [readEmailsSet, favoriteEmailsSet]);

	useEffect(() => {
		persistState(readEmailsSet, favoriteEmailsSet);
	}, [readEmailsSet, favoriteEmailsSet]);

	const handleEmailSelect = async (email: Email) => {
		setSelectedEmail(email);
		const body = await fetchEmailBody(email.id);
		setEmailBody(body);

		const newReadEmails = new Set(readEmailsSet).add(email.id);
		setReadEmailsSet(newReadEmails);

		setEmails((prevEmails) => prevEmails.map((e) => (e.id === email.id ? { ...e, read: true } : e)));
	};

	const handleMarkFavorite = (emailId: string) => {
		const newFavoriteEmails = new Set(favoriteEmailsSet);
		if (newFavoriteEmails.has(emailId)) {
			newFavoriteEmails.delete(emailId);
		} else {
			newFavoriteEmails.add(emailId);
		}
		setFavoriteEmailsSet(newFavoriteEmails);

		setEmails((prevEmails) => prevEmails.map((e) => (e.id === emailId ? { ...e, favorite: !e.favorite } : e)));
	};

	const filteredEmails = emails.filter((email) => {
		switch (filter) {
			case "unread":
				return !email.read;
			case "read":
				return email.read;
			case "favorites":
				return email.favorite;
			default:
				return true;
		}
	});

	return (
		<main className="flex flex-col bg-[#F4F5F9] p-4 px-8 text-[#636363] min-h-screen">
			<FilterButtons filter={filter} setFilter={setFilter} />
			<section className="flex flex-col items-center">
				<div className="flex gap-x-4 w-full">
					<EmailList emails={filteredEmails} selectedEmail={selectedEmail} onEmailSelect={handleEmailSelect} />
					{selectedEmail && <EmailBody email={selectedEmail} body={emailBody} onMarkFavorite={handleMarkFavorite} />}
				</div>
			</section>
		</main>
	);
};

export default App;
