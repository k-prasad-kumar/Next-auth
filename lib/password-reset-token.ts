import { ResetPasswordToken } from "@/models/users";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await ResetPasswordToken.findOne({ email });

    return resetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const resetToken = await ResetPasswordToken.findOne({ token });

    return resetToken;
  } catch (error) {
    return null;
  }
};
