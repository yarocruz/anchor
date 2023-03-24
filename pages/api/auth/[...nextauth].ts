import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../prisma/client"
import type { NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        CredentialsProvider({
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            name: "Credentials",
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })
                if (!user) {
                    throw new Error("No user found with that email");
                }

                const isValid = await compare(credentials?.password!, user.password!);

                if (!isValid || user.email !== credentials?.email) {
                    throw new Error("Invalid email or password");
                }

                return user;
            }
        })
    ],
    session: {
        strategy: 'jwt',
    }
}

export default NextAuth(authOptions)