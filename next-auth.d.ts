import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
      role: string;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
    };
  }

  interface User extends DefaultUser {
    role: string;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  }
}

// import NextAuth, { type DefaultSession } from "next-auth";

// export type ExtendedUser = DefaultSession["user"] & {
//   role: string;
//   isTwoFactorEnabled: boolean;
//   isOAuth: boolean;
// };

// declare module "next-auth" {
//   interface Session {
//     user: ExtendedUser;
//   }
// }
