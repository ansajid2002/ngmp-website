import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { AdminUrl } from "@/app/layout";

export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: 'cred',
            credentials: {
                email: { label: "Email", placeholder: 'Enter Email' },
                password: { label: "Password", placeholder: 'Enter Password' },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                console.log(credentials);

                const requestBody = {
                    email: credentials?.email,
                    password: credentials?.password,
                };

                const response = await fetch(`${AdminUrl}/api/customerLoginEmail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                const data = await response.json();

                if (data) {
                    // Any object returned will be saved in `user` property of the JWT
                    return data
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
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
        async signIn({ account, profile }) {
            console.log(account);

            if (account && account.provider === "google") {
                return profile && profile?.email_verified && profile?.email.endsWith("@gmail.com")
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }