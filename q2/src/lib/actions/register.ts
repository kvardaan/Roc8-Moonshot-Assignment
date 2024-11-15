"use server";

import * as z from "zod";

import { SignUpSchema } from "@/lib/schemas/auth";
import { hashPassword } from "@/lib/utils/auth";
import { sendVerificationEmail } from "@/lib/utils/mail";
import { createUser, getUserByEmail } from "@/lib/data/user";
import { generateVerificationToken } from "@/lib/utils/tokens";

export const register = async (values: z.infer<typeof SignUpSchema>) => {
	const validatedFields = SignUpSchema.safeParse(values);

	if (!validatedFields.success) return { error: "Invalid fields!" };

	const { email, password } = validatedFields.data;
	const hashedPassword = await hashPassword(password);

	const existingUser = await getUserByEmail(email);
	if (existingUser) return { error: "Email already exists!" };

	try {
		await createUser({ ...validatedFields.data, password: hashedPassword });
	} catch {
		return { error: "Something went wrong!" };
	}

	// verify email
	const verificationToken = await generateVerificationToken(email);
	await sendVerificationEmail(email, verificationToken.token);

	return { success: "Confirmation email sent!" };
};
