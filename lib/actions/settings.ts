"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { SettingsSchema } from "@/schemas";
import { currentUser } from "../current-user";
import { getUserByEmail, getUserById } from "./users";
import { User } from "@/models/users";
import { generateVerificationToken } from "../tokens";
import { sendVerificationEmail } from "../email";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) return { error: "Unauthorized" };

  const dbUser = await User.findById(user.id).select("+password");
  if (!dbUser) return { error: "Unauthorized" };

  if (user.isOAuth) {
    values.email = undefined;
    values.isTwoFactorEnabled = undefined;
    values.password = undefined;
    values.newPassword = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && user.id !== existingUser._id)
      return { error: "Email already in use!" };
    const verificationToken = await generateVerificationToken(values.email);

    // change user email verification to null | false
    // await User.findByIdAndUpdate(user.id, { emailVerified: null });

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent." };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) return { error: "Incorrect password!" };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updated = await User.findByIdAndUpdate(user.id, { ...values });

  return { success: "Settings updated." };
};
