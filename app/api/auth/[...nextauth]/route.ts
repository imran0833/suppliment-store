import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({

  providers: [

    CredentialsProvider({

      name: "Credentials",

      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials: any) {

        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // ✅ find user
        const user = await User.findOne({
          email: credentials.email
        });

        if (!user) return null;

        // ✅ check password
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) return null;

        // ✅ return user (NO password)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role
        };
      }

    })

  ],

  session: {
    strategy: "jwt"
  },

  pages: {
    signIn: "/login"
  },

  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    }

  }

});

export { handler as GET, handler as POST };