import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'cred',
            credentials: {
                email: { label: "Email", placeholder: 'Enter EMail' },
                password: { label: "Password", placeholder: 'Enter Password' },
            },
            async authorize(credentials) {
                return true
            }
        })
    ]
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }