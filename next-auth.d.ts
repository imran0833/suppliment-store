import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's role. */
      role?: string;
    } & DefaultSession["user"];
  }

  /**
   * The type of the user object that will be passed to `session` and `jwt` callbacks
   */
  interface User extends DefaultUser {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * The type of the JWT token
   */
  interface JWT {
    role?: string;
  }
}
