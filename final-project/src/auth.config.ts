import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./app/models/userSchema";
import connectDB from "../config/mongodb";

export const authConfig: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          await connectDB();

          const user = await User.findOne({ email: credentials.email }).lean();
          if (!user) return null;

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isMatch) {
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.username,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.log("Auth error:", error);
          return null;
        }
      },
    }),
  ],
};
