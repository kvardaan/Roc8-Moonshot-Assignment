import { auth } from "@/lib/auth";

export const ProfileButton = async () => {
	const session = await auth();
	const user = session?.user;

	return (
		<div className="flex flex-row items-center justify-center gap-x-3">
			<p className="text-lg md:text-xl font-semibold">{user?.name}</p>
		</div>
	);
};
