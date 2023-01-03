import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  events: {
    async signIn({ user, account }) {
      // Update access_token and scope
      // Workaround while prismaadapter not updating account Updates
      const acc = await prisma.account.findFirst({
        where: {
          userId: user.id,
        },
      });
      const updateAccount = await prisma.account.update({
        where: {
          id: acc?.id,
        },
        data: {
          access_token: account?.access_token,
          scope: account?.scope,
        },
      });
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      authorization: {
        url: "https://github.com/login/oauth/authorize",
        params: {
          scope: "read:user user:email user:follow",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
