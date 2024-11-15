import { formatDate, getAvatarLetter } from "../lib/utils";
import { Email, EmailBody as EmailBodyType } from "../lib/types";
import { BeatLoader } from "react-spinners";

interface EmailBodyProps {
	email: Email;
	body: EmailBodyType | null;
	onMarkFavorite: (emailId: string) => void;
}

const EmailBody: React.FC<EmailBodyProps> = ({ email, body, onMarkFavorite }) => {
	if (!body)
		return (
			<article className="w-2/3 p-8 my-4 border-2 rounded-lg bg-white flex flex-row justify-center gap-x-6">
				<BeatLoader color="#E54065" />
			</article>
		);

	return (
		<article className="w-2/3 p-8 my-4 border-2 rounded-lg bg-white flex flex-row gap-x-6">
			<aside className="w-1/6 flex items-start justify-center">
				<span className="min-w-12 w-12 h-12 rounded-full bg-[#E54065] text-white text-2xl flex items-center justify-center">
					{getAvatarLetter(email.from.name[0])}
				</span>
			</aside>
			<section className="flex flex-col gap-y-5">
				<header className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">{email.subject}</h1>
					<button className="px-4 py-2 bg-[#E54065] text-white rounded-full" onClick={() => onMarkFavorite(email.id)}>
						{email.favorite ? "Unmark as Favorite" : "Mark as favorite"}
					</button>
				</header>
				<time>{formatDate(email.date)}</time>
				<main className="prose -mt-2 max-w-none" dangerouslySetInnerHTML={{ __html: body.body }} />
			</section>
		</article>
	);
};

export default EmailBody;
