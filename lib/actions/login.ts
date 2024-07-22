"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "./users";
import { generateTwoFactorToken, generateVerificationToken } from "../tokens";
import { sendTwoFactorEmail, sendVerificationEmail } from "../email";
import bcrypt from "bcryptjs";
import {
  getTwoFactorConfirmationByUserId,
  getTwoFactroTokenByEmail,
} from "../two-factor-token";
import { TwoFactorConfirmation, TwoFactorToken } from "@/models/users";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields" };

  const { email, password, code } = validatedFields.data;

  // checking if user exist or not with given email
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: "Email does not exist!" };

  // checking password with existing one
  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordMatch) return { error: "Password does not match!" };

  // checking user email verified or not
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    // sending email if user not verified email
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent." };
  }

  // checking user enabled two factor authentication or not
  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      const twoFactorCode = await getTwoFactroTokenByEmail(existingUser.email);

      if (!twoFactorCode) return { error: "Invalid Code!" };

      if (twoFactorCode.token !== code) return { error: "Invalid code!" };

      const hasExpired = new Date(new Date(twoFactorCode.expires)) < new Date();
      if (hasExpired) return { error: "Code Expired please try again!" };

      await TwoFactorToken.findByIdAndDelete(twoFactorCode._id);

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser._id
      );

      if (existingConfirmation) {
        await TwoFactorConfirmation.findByIdAndDelete(existingConfirmation._id);
      }

      await TwoFactorConfirmation.create({ userId: existingUser._id });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      // sending 2FA code if user enabled 2FA
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };

        case "CallbackRouteError":
          return { error: "Invalid credentials!" };

        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
