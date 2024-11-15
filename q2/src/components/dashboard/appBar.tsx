import Link from "next/link";
import { Rocket } from "lucide-react";

import { ProfileButton } from "@/components/dashboard/profileButton";

export const AppBar = () => {
	return (
		<header className="w-full top-0 p-3 md:p-4 border-b">
			<div className="flex items-center justify-between w-full h-full">
				<div className="flex flex-row justify-center items-center gap-x-3 text-xl">
					<Link href="/" className="border p-2 rounded-lg">
						<Rocket />
					</Link>
				</div>
				<div className="flex justify-between items-center gap-x-1">
					<div className="flex gap-x-3 items-center">
						<div className="flex items-center gap-x-3">
							<ProfileButton />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
