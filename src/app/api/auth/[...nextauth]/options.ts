import { type NextAuthOptions } from "next-auth";
import { compare } from "bcryptjs";
import prisma from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import Providers from "next-auth/providers"


import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const NEXT_AUTH: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
          require: true,
        },
        password: { label: "Password", type: "password", require: true },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        console.log(credentials.username, credentials.password)

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });


        if (!user) {
          console.log("no user found")
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password || ""
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id + '',
          email: user.username,
          name: user.name,
          // Role: user.role
        }
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      
  }),

  ],
  callbacks: {
    // async jwt({ token, user }: { token: JWT; user: User | AdapterUser; }) {
    async jwt({ token, user }: { token: any; user: any; }) {

      console.log("JWT Callback", { token, user });
      // user parameter is only passed to this function, the first time the user logs in!
      // so user token is not always going to be present
      //   console.log("JWT callback: ", { token, user });
      if (user) {
        const u = user as unknown as any;

        // const info = await prisma.user.findFirst({
        //   where:{
        //     OR: [
        //       { email: user.email },
        //       { username: user.email }
        //     ]
        //   }
        // })

        const info = await prisma.user.findFirst({
          where:{
            id: user.id as string
          }
        })

        return {
          ...token,
          id: u.id,
          role: info?.role,
        };
      }
      return token;
    },
    async session({ session, token }: any) {
      console.log("Session Callback", { session, token });
      const newSession = {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role
        },
      };

      console.log("New Session", newSession)

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
