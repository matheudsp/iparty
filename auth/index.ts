import NextAuth from "next-auth";
import { authConfig } from "@/auth/config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById, updateUserById } from "@/services/user";
import { getTwoFactorConfirmationByUserId } from "@/services/two-factor-confirmation";
import { isExpired } from "@/lib/utils";
import { getAccountByUserId } from "@/services/account";
import Stripe from "stripe";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 Day
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await updateUserById(user.id, { emailVerified: new Date() });
    },
    //stripe
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET!, {
        apiVersion: '2024-10-28.acacia',
      });

      await stripe.customers.create({
        email: user.email!,
        name: user.name!,
      }).then(async (customer) => {
        return db.user.update({
          where: { id: user.id },
          data: {
            stripeCustomerId: customer.id
          }
        })
      })
    },

  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.name = existingUser.name;
      token.email = existingUser.email;

      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.isOAuth = !!existingAccount;

    
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
        session.user.isOAuth = token.isOAuth;

      }

      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);
      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      // If user's 2FA checked
      if (existingUser.isTwoFactorEnabled) {
        const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        // If two factor confirmation doesn't exist, then prevent to login
        if (!existingTwoFactorConfirmation) return false;
        // If two factor confirmation is expired, then prevent to login
        const hasExpired = isExpired(existingTwoFactorConfirmation.expires);
        if (hasExpired) return false;
      }

      return true;
    },
  },
  ...authConfig,
});
