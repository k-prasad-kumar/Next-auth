"use server";

import { ResetSchema } from "@/schemas";
import * as z from "zod";
import { getUserByEmail } from "./users";
import { generateResetPasswordToken } from "../tokens";
import { sendPasswordResetVerificationEmail } from "../email";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values);

  if (!validateFields.success) return { error: "Invalid emails!" };

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "Email does not exist!" };
  const resetToken = await generateResetPasswordToken(email);

  await sendPasswordResetVerificationEmail(resetToken.email, resetToken.token);

  return { success: "Reset email sent." };
};
