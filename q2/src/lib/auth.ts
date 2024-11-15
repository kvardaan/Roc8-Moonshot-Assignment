import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

import prisma from "@/lib/clients/prisma";
import { getUserById } from "@/lib/data/user";
import { getUserByEmail } from "@/lib/data/user";
import { LoginSchema } from "@/lib/schemas/auth";
import { comparePassword } from "@/lib/utils/auth";
import { getAccountByUserId } from "@/lib/data/account";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google,
		GitHub,
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				const validCredentials = LoginSchema.safeParse(credentials);

				if (!validCredentials.success) return null;
				const { email, password } = validCredentials.data;

				const user = await getUserByEmail(email);
				if (!user || !user.password) return null;

				const doPasswordsMatch = await comparePassword(password, user.password);

				return doPasswordsMatch ? { id: user.id.toString(), email: user.email, name: user.name } : null;
			},
		}),
	],
	pages: {
		signIn: "/login",
		error: "/error",
	},
	events: {
		async linkAccount({ user }) {
			await prisma.user.update({
				where: { id: user.id },
				data: {
					emailVerified: new Date(),
				},
			});
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== "credentials") return true;

			const existingUser = await getUserById(user.id as string);

			if (!existingUser?.emailVerified) return false;

			return true;
		},
		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}

			if (session.user) {
				session.user.name = token.name;
				session.user.isOAuth = token.isOAuth as boolean;
			}

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await getUserById(token.sub);

			if (!existingUser) return token;

			const existingAccount = await getAccountByUserId(existingUser.id);

			token.isOAuth = !!existingAccount;
			token.name = existingUser.name;
			return token;
		},
	},
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
});
