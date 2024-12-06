import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt'
import prisma from "../prisma/db"
const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })

                if (!user || !await compare(credentials.password, user.password)) {
                    throw new Error("يوجد خطأ ما في البريد الإلكتروني أو كلمة المرور.")
                } else {
                    return user
                }
            }
        })
    ],
    pages: {
        signIn: "/signin"
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET

}

export default authOptions