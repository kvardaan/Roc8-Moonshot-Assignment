import { redirect } from "next/navigation";

import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { poppins } from "@/lib/utils/fonts";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/loginButton";

export default async function Page() {
	const session = await auth();
	if (session?.user) return redirect("/dashboard");

	return (
		<main className="flex flex-col items-center justify-center h-screen">
			<div className="flex flex-col gap-y-6 text-center w-full">
				<h1 className={cn("mx-auto max-w-[90%] text-5xl font-bold drop-shadow-md", poppins.className)}>
					Interactive Data Visualization Dashboard
				</h1>
				<LoginButton>
					<Button size="lg" className="text-lg">
						Login
					</Button>
				</LoginButton>
			</div>
		</main>
	);
}
