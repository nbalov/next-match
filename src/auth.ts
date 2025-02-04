// server side functions
// these cannot be called directly from client side
// use them only in 'use server' files, e.g. actions/authActions.ts

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
 
//import { PrismaClient } from "@prisma/client"
//const prisma = new PrismaClient()
import {prisma} from './lib/prisma'
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    /*async jwt({token}) {
      // token will be displayed in the server terminal
      console.log('token', token);
      // token.sub is the user id in prisma database
      return token;
    }*/
    async session({token, session}) {
      // token will be displayed in the server terminal
      //console.log('token', token);
      //console.log('session', token);
      // token.sub is the user id in prisma database
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})