import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user = user;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
