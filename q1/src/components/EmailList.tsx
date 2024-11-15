import { Email } from "../lib/types";
import { formatDate, getAvatarLetter } from "../lib/utils";

interface EmailListProps {
	emails: Email[];
	selectedEmail: Email | null;
	onEmailSelect: (email: Email) => void;
}

const EmailList: React.FC<EmailListProps> = ({ emails, selectedEmail, onEmailSelect }) => {
	return (
		<aside className={`${selectedEmail ? "w-1/3" : "w-full"}`}>
			{emails.map((email) => (
				<article
					key={email.id}
					className={`p-4 cursor-pointer ${email.read ? "bg-[#F2F2F2]" : "bg-white"} border-2 rounded-lg my-4 ${
						selectedEmail?.id === email.id ? "border-[#E54065]" : ""
					}`}
					onClick={() => onEmailSelect(email)}
				>
					<section className="flex items-start mb-2">
						<span className="min-w-12 w-12 h-12 rounded-full bg-[#E54065] text-white text-2xl flex items-center justify-center mr-3">
							{getAvatarLetter(email.from.name[0])}
						</span>
						<section className="flex flex-col gap-y-2">
							<header>
								<p>
									From:{" "}
									<span className="font-bold">
										{email.from.name} &lt;{email.from.email}&gt;
									</span>
								</p>
								<p>
									Subject: <span className="font-bold">{email.subject}</span>
								</p>
							</header>
							<p className="line-clamp-1">{email.short_description}</p>
							<footer className="flex gap-4">
								<time className="text-sm">{formatDate(email.date)}</time>
								{email.favorite && <span className="text-[#E54065] text-sm font-semibold">Favorite</span>}
							</footer>
						</section>
					</section>
				</article>
			))}
		</aside>
	);
};

export default EmailList;
