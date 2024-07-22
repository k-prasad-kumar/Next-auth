import {
  ResetPasswordToken,
  TwoFactorToken,
  VerificationToken,
} from "@/models/users";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { getVerificationTokenByEmail } from "./verification-token";
import { getPasswordResetTokenByEmail } from "./password-reset-token";
import { getTwoFactroTokenByEmail } from "./two-factor-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await VerificationToken.findByIdAndDelete(existingToken._id);
  }

  const verificationToken = await VerificationToken.create({
    email,
    token,
    expires,
  });

  return verificationToken;
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await ResetPasswordToken.findByIdAndDelete(existingToken._id);
  }

  const resetToken = await ResetPasswordToken.create({
    email,
    token,
    expires,
  });

  return resetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(1_00_000, 10_00_000).toString();

  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactroTokenByEmail(email);

  if (existingToken) {
    await TwoFactorToken.findByIdAndDelete(existingToken._id);
  }

  const twoFactorToken = await TwoFactorToken.create({
    email,
    token,
    expires,
  });

  return twoFactorToken;
};
