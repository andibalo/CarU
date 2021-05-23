import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import db from "../../../utils/db/index";
import bcrypt from "bcrypt";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        let user;

        const userRef = db.collection("users");

        const snapshot = await userRef
          .where("email", "==", credentials.email)
          .get();

        if (snapshot.empty) {
          throw new Error("User does not exist");
        }

        snapshot.forEach((doc) => {
          user = doc.data();
        });

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid Email/Password");
        }

        //Returned object will be encoded in the jwt token
        return {
          email: user.email,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  callbacks: {
    async session(session, token) {
      return token;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (profile) {
        return { ...token, user: profile };
      }
      return token;
    },
  },
});
