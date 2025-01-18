import NextAuth, { DefaultSession } from "next-auth";


declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the id property
      role: string; // Add the role property
    //   name?: string | null;
    //   email?: string | null;
    //   image?: string | null;
      // address?: string | null; // Optional: Include your custom address field
    } & DefaultSession["user"] 
  }
}

import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    id: string; // Add the id property
    role: string; // Add the role property
  } 
}