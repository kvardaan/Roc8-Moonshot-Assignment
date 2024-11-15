import Link from "next/link";

import { signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const Footer = () => {
	return (
		<footer className="w-full bottom-0 p-3 md:p-4 border-t">
			<div className="flex flex-row justify-between gap-3">
				<Link href="/" className="flex gap-2 font-medium text-sm md:text-lg items-center">
					Dashboard
				</Link>
				<Button
					onClick={async () => {
						"use server";
						await signOut();
					}}
				>
					<LogOut className="w-4 h-4" />
					Sign out
				</Button>
			</div>
		</footer>
	);
};
