import { User } from "@/models/user";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import bycript  from 'bcryptjs';
import { connectToDb } from "./connectToDb";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
        Credentials({
            // credentials: {
            //     email: { label: "Email", type: "email" },
            //     password: { label: "Password", type: "password" },
            // },
            authorize: async (credentials) => {
                // console.log("credentials:",credentials);
                const {email,password} = credentials;
                connectToDb();
                if (!email || !password) {
                    throw new Error("Please Enter Your Valid Email & Password...");
                }
                const user = await User.findOne({email});

                // console.log("user:", user); 

                if (!user) {
                    throw new Error("Please Enter Your Valid Email...");
                }
                const isValidPass = bycript.compare(password,user.password)

                if (!isValidPass) {
                    throw new Error("Invalid Password...");
                }
                user.password = undefined
                return user;
            },
        }),
    ],
    callbacks:{
        async signIn({ user, account }) {
            if (account.provider === "google") {
                try {
                    await connectToDb();
                    const userExits = await User.findOne({ email: user.email })
                    if (!userExits) {
                        const newUser = new User({
                            username: user.name.split(" ").join("").toLowerCase().replaceAll(".", ""),
                            email: user.email
                        })
                        await newUser.save();
                    }
                } catch (error) {
                    return false;
                }

            }
            return true
        },
        jwt: async ({ token }) => {
            const userByEmail = await User.findOne({ email: token.email });
            userByEmail.password = undefined;
            token.user = userByEmail;
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user;
            return session
        }
    },
    secret: process.env.AUTH_SECRET,
    pages:{
        signIn: "/login"
    }
})


/*
Note: authorize function should return exact db user (i mean ref, can be changed property values). the return value inside jwt({user}).

jwt({token,user}) --->
when login:
token = {
    name: undefined,
    email: it's user login email,
    picture: undefined,
    sub: '6671d0c5fb1548e8056c4860'
} 
user = return user from authorize method 
updated token = {
    name: undefined,
    email: it's user login email,
    picture: undefined,
    sub: '6671d0c5fb1548e8056c4860',
    user: return user from authorize method 
} 

After login:
token = {
    email: it's user login email,
    sub: '6671d0c5fb1548e8056c4860',
    user: return user from authorize method ,
    iat: 1718735366,
    exp: 1721327366,
    jti: 'bde8831b-22be-4cf5-bcbf-3fad405c1dc5'
}  (without undefined property)
user = undefined

session({session,token}) --->
After login:
session = {
    user: { name: undefined, email: it's user login email, image: undefined },
    expires: '2024-07-18T18:29:27.017Z'
} 
token = jwt return updated token

updated session = {
    user: user inside token,
    expires: '2024-07-18T18:29:27.017Z'
} 

If I do not add jwt & session --> session in client component will return only email. that's why we modify session here and add data but we do not add sensitive data(like password), so before adding we remove password.


Now about signIn method of callback: if signIn return true - user will be authentcated if false user will be  unauthenticated.
*/

