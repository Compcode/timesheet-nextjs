import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import users from "@/data/users.json"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null

        const user = users.find( u => u.email === credentials.email && u.password === credentials.password )

        if (!user) return null

        return { id: user.id, name: user.name, email: user.email }
      }
    })
  ],
  
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET
}
