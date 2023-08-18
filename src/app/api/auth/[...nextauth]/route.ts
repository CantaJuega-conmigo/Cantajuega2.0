// import NextAuth, { User, type NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// interface CustomUser extends User {
//   token?: string;
//   user?: any;
// }
// export const authOptions: NextAuthOptions = {
//   providers: [
    
//     CredentialsProvider({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//         firstName: { label: "text", type: "text" },
//         lastName: { label: "text", type: "text" },
//         type:{label:'text',type:'text'}
//       },

//       async authorize(credentials, req) {
//         const { email, password, lastName, firstName ,type} = credentials ?? {};
//        console.log(email,password,type)
//         const resquest = await fetch(
//           "http://localhost:3001/api/user/login", ///cambiar a ruta de back o deploy/ poner .env
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json", // Especifica el tipo de contenido JSON
//             },
//             body: JSON.stringify({ email, password}), // Convierte el objeto a formato JSON
//           }
//         )
        

//         const user = await resquest.json();
//         if (!resquest.ok) {
//           throw new Error(resquest.statusText);
//         }
//         // If no error and we have user data, return it
//         if (resquest.ok && user) {
//           return {
//             ...user,
//             token: user.token, // Asegurarse de que el objeto de usuario tenga la propiedad "token"
//           };
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         const customUser = user as CustomUser;
//         token.accessToken = customUser.token;
//         token.user = customUser.user;
//       }
//       return token;
//     },
//     async session({ session, token, user }) {
    
//       if (token) {
//         const customUser = token as any;
//          session.user=customUser.user
//       }

//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//     maxAge: 60 * 60 * 24, ///un dia dura la sesion
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
// ////todo esto manejara la sesion del lado del front, en el back la sesion se maneja de otra manera
