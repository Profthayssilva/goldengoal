// auth.config.ts
import type { NextAuthConfig } from "next-auth";

const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
};

export default authConfig;

