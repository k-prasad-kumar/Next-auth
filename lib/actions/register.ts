"use server";
import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { connectToDB } from "@/models/connect";
import { User } from "@/models/users";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/actions/users";
import { generateVerificationToken } from "../tokens";
import { sendVerificationEmail } from "../email";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields" };

  try {
    await connectToDB();

    const { name, email, password } = validatedFields.data;

    // checking if email is already registered
    const existingUser = await getUserByEmail(email);
    if (existingUser) return { error: "Email already registered" };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
  } catch (error: any) {
    return { error: error?.message };
  }

  return { success: "Confirmation email sent!" };
};
