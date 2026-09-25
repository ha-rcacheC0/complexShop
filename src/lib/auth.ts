import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../db/auth-schema";
import { db } from "../db"; // your drizzle instance
import { tanstackStartCookies } from "better-auth/tanstack-start/solid";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema
    }),

    emailAndPassword: {    
        enabled: true,
        autoSignIn: false
    }, 

    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },

    plugins: [tanstackStartCookies()] // make sure this is the last plugin in the array
});