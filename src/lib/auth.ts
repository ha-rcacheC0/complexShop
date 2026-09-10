import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../db/auth-schema";
import { db } from "../db"; // your drizzle instance
import { tanstackStartCookies } from "better-auth/tanstack-start/solid";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema
    }),

    emailAndPassword: {    
        enabled: true,
        autoSignIn: false
    }, 

    plugins: [tanstackStartCookies()] // make sure this is the last plugin in the array
});