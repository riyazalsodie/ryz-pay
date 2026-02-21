import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../src/lib/db";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60 // 5 minutes
        }
    },
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3201",
    trustedOrigins: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:3201"],
    // Add more providers or config as needed
    plugins: [
        admin()
    ]
});
