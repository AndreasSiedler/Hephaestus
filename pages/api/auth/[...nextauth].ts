import NextAuth from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../config/dbConnect";
import User, { IUser } from "../../../models/user";
import { LoggedInSession } from "../../../types";

// eslint-disable-next-line new-cap
export default NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    credentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        dbConnect();
        // Check if eemal and password is entered
        if (!email || !password) {
          throw new Error("Please enter email or password.");
        }

        // Find user in the database
        const user = await User.findOne<IUser>({ email }).select("+password");
        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        // Check if password is correct or not and set it to empty afterwards
        const isPasswordMatched = await user.comparePassword(password);
        user.password = undefined;

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      const user = token.user as IUser;
      session.user = user;
      return session as LoggedInSession;
    },
  },
});
