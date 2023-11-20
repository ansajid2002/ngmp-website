import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { AdminUrl } from "@/app/layout";
import { User as NextAuthUser } from "next-auth";

type User = NextAuthUser & {
    name: string;
    // Add other properties as needed
};

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'cred',
            credentials: {
                email: { label: "Email", placeholder: 'Enter Email' },
                password: { label: "Password", placeholder: 'Enter Password' },
            },
            async authorize(credentials, req) {
                const { email, password } = req.body;

                const requestBody = {
                    email,
                    password,
                };

                const response = await fetch(`${AdminUrl}/api/customerLoginEmail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                const data = await response.json();

                // Extend NextAuthUser with your additional properties
                const user: User = { ...data, name: data.name };

                return user;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, profile, user }) {
            if (account && account.provider === "google") {
                return profile && profile?.email_verified && profile?.email.endsWith("@gmail.com");
            } else if (account && account.provider === "credentials") {
                return user;
            }
            return true;
        },
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
