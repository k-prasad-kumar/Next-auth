import { TwoFactorConfirmation, TwoFactorToken } from "@/models/users";

export const getTwoFactroTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await TwoFactorToken.findOne({ email });

    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactroTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await TwoFactorToken.findOne({ token });

    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await TwoFactorConfirmation.findOne({
      userId: userId,
    });

    return twoFactorConfirmation;
  } catch (error) {
    return null;
  }
};
