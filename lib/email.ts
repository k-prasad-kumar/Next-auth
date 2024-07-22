import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirmation Email",
    html: `<p> Click here to confirm your account: <a href="${confirmLink}">Confirm Email</a></p>`,
  });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two-Factor Authentication Code",
    html: `<p> Your Two-Factor Authentication code is:</p> <br/> <h1>${token}</h1>`,
  });
};

export const sendPasswordResetVerificationEmail = async (
  email: string,
  token: string
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Password Reset Confirmation Email",
    html: `<p> Click here to reset your password: <a href="${resetLink}">reset password</a></p>`,
  });
};
