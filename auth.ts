import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import { getUserById } from "./lib/actions/users";
import { TwoFactorConfirmation, User } from "./models/users";
import { getTwoFactorConfirmationByUserId } from "./lib/two-factor-token";
import type { Adapter } from "next-auth/adapters";
import { getAccountByUserId } from "./lib/actions/account";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await User.findByIdAndUpdate(user.id, {
        role: "user",
        emailVerified: new Date(),
        isTwoFactorEnabled: false,
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth sign in without email verification

      if (account?.provider === "credentials") {
        const existingUser = await getUserById(user.id!);

        // prevent user signin without email verification
        if (!existingUser?.emailVerified) return false;

        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
            existingUser._id
          );

          if (!twoFactorConfirmation) return false;

          // deleting 2FA confirmation for next sign in
          await TwoFactorConfirmation.findByIdAndDelete(
            twoFactorConfirmation._id
          );
        }
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) session.user.role = token.role;

      if (session.user)
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser._id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
});
