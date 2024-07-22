"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/models/connect";
import { ResetPasswordToken, User, VerificationToken } from "@/models/users";
import { getVerificationTokenByToken } from "../verification-token";
import { getPasswordResetTokenByToken } from "../password-reset-token";
import { PasswordSchema } from "@/schemas";

export const getUserByEmail = async (email: string) => {
  try {
    await connectToDB();

    const user = await User.findOne({ email: email }).select("+password");
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectToDB();

    const user = await User.findById(id);
    return user;
  } catch (error) {
    return null;
  }
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return { error: "Token does not exist!" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { erreor: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Email does not exist!" };

  await User.findByIdAndUpdate(existingUser._id, {
    // we are updating email because when user want to change his email we use this function
    email: existingToken.email,
    emailVerified: new Date(),
  });

  await VerificationToken.findByIdAndDelete(existingToken._id);

  return { success: "Email verified successfully." };
};

export const passwordResetVerification = async (
  token: string,
  values: z.infer<typeof PasswordSchema>
) => {
  const validatedFields = PasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid Password" };

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { error: "Token does not exist!" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "Email does not exist!" };

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(existingUser._id, {
      password: hashedPassword,
    });

    await ResetPasswordToken.findByIdAndDelete(existingToken._id);
  } catch (error) {
    return { error: "Something went wrong!" };
  }

  return { success: "Password changed successfully" };
};
