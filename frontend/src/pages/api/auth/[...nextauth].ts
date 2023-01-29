import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";
import { GithubPublicUser } from "../../../util/types";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      /**
       * Get username from github api and save it
       */
      const res = await fetch(`https://api.github.com/user/${account?.providerAccountId}`);
      const data = (await res.json()) as GithubPublicUser;

      /**
       * Check if github user was updated since last login
       * If it was updated update also update in gitbud db
       */
      const githubWasUpdated = user.updatedAtGithub > data.updated_at;

      if (githubWasUpdated) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            username: data.login,
            company: data.company,
            blog: data.blog,
            location: data.location,
            hireable: data.hireable,
            bio: data.bio,
            followers: data.followers,
            following: data.following,
            createdAtGithub: data.created_at,
            updatedAtGithub: data.updated_at,
          },
        });
      }

      /**
       * Update access_token and scope
       * Workaround while prismaadapter not updating account Updates
       */
      const acc = await prisma.account.findFirst({
        where: {
          userId: user.id,
        },
      });
      await prisma.account.update({
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
  callbacks: {
    async session({ session, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user = user;

      return session;
    },
  },
});
