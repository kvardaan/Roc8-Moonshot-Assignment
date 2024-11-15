import { Metadata } from "next";

import { cn } from "@/lib/utils";
import { poppins } from "@/lib/utils/fonts";

export const metadata: Metadata = { title: "Dashboard" };

const Page = () => {
	return (
		<main className="flex items-center justify-center w-full">
			<h1 className={cn("text-5xl font-bold drop-shadow-md text-center", poppins.className)}>
				Interactive Data Visualization Dashboard
			</h1>
		</main>
	);
};

export default Page;
