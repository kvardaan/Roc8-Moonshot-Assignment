import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { AppBar } from "@/components/dashboard/appBar";
import { Footer } from "@/components/dashboard/footer";

interface LayoutProps {
	children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
	const session = await auth();
	if (!session?.user) redirect("/login");

	return (
		<div className="flex flex-col min-h-screen">
			<AppBar />
			<main className="flex-grow flex flex-row gap-2 w-full p-3">{children}</main>
			<Footer />
		</div>
	);
}
