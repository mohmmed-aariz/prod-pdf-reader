import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import bcryptjs from 'bcryptjs'
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";


export const NEXT_AUTH = {
    adapter: PrismaAdapter(prisma),

    providers: [
        CredentialsProvider({
            id: "AdminTable",
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
        
            credentials: {
            username: { label: "Username", type: "text", placeholder: "Username", require: true},
            password: { label: "Password", type: "password", require: true }
            },
        
            async authorize(credentials, req): Promise<any> {
                const hashPassword = await bcryptjs.hash(credentials?.password || "" , 10);
                // console.log("hi there!")
                console.log(credentials?.username || "no username");
                console.log(credentials?.password || "no password");
                const existingUser = await prisma.admin.findFirst({
                    where: {
                        username: credentials?.username
                    }
                })
        
                if(!existingUser){
                    throw new Error("No user with this email found");
                }
                // we can even check if the user is verified or not!
        
                
                // we will search for the email of the user in db and check if the password in the db matches the password entered by the user
                const passwordValidate = await bcryptjs.compare(credentials?.password || "", existingUser.password)
        
                if(passwordValidate){
                    return {
                        id: existingUser.id,
                        name: existingUser.name,
                        email: existingUser.username,
                        role: existingUser.role
                    }
                    // console.log(existingUser);
                    // console.log("after hi there")
                    
                    // return existingUser
                }
                else {
                    throw new Error("Incorrect password!");
                    // or return null
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            id: 'UserTable', 
            name: 'UserTable',
        }),

    
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({token, user }: {token: any, user: any }){
            // console.log("token is: ")
            // console.log(token);
            // console.log("user is: ")
            // console.log(user);
            // console.log("________")
            token.id = token.sub;

            
            if(user.role){
                // as the role will exist only for admin table, so in those tokens add role to session token 
                // but for user the role field is not present so find the user in user's table and send the required session token
                const info = await prisma.admin.findFirst({
                    where: {
                        id: token.sub
                    }
                })
    
                // console.log("info is: ");
                // console.log(info);
    
    
                token.role = info?.role

            }


            // for user table, we can check if the user is authenticated, then in the session we can set the role as "user" by default and if the role is passed

            
            // console.log("updated token is: ")
            // console.log(token);



        
            // console.log("CSRFtoken", token.CSRFtoken)
            
            return token
        },

        // async session({ session, user, token}: {session: any, user: any, token: any}){
        async session({ session, token}: {session: any, token: any}){

            // console.log("session is: ")
            // console.log(session);

            // console.log("user is: ")
            // console.log(user);

            // console.log("token is: ")
            // console.log(token);

            // console.log("_________")

            session.user.role = token.role;
            session.user.id = token.sub;
            
            // console.log("updated session is: ")
            // console.log(session);


            // session.user.adminId = client.admin.findFirst(
            //     {
            //         where: {
            //             id: token.sub
            //         }
            //     }
            // ).



            // session.user.email = user

            // console.log("session getting called")
            // console.log("SessionToken: ", session.SessionToken)


            return session
        },

        async signIn({user, account, profile}: {user:any, account:any, profile:any}){
            // console.log("user", user);
            // console.log("account", account);
            // console.log("profile", profile)
            return true;
        }
    },
    // pages: {
    //     signIn: "/signin"
    // }
}

