import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

// Tipo retornado pelo authorize
interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Tipagem real das credenciais recebidas
interface CredentialsType {
  email?: string;
  password?: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "credentials",

      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(rawCredentials): Promise<AuthUser | null> {
        const credentials = rawCredentials as CredentialsType;

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Busca o usuário no banco
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          return null;
        }

        // Valida a senha
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          return null;
        }

        // Retorna usuário válido
        return {
          id: user.id,
          email: user.email ?? "",
          name: user.name ?? "",
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as AuthUser;
        token.id = u.id;
        token.role = u.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
});
