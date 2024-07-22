import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(4, "Name is required"),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(8, "Password must contain at least 8 character(s)"),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" }),
  code: z.optional(
    z.string().min(6, {
      message: "Your Two-Factor code must be 6 characters.",
    })
  ),
});

export const ResetSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
});

export const PasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 character(s)" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must contain at least 8 character(s)" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords doesn't match",
    path: ["confirmPassword"], // path of error
  });

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    password: z.optional(
      z.string().min(8, "Password must contain at least 8 character(s)")
    ),
    newPassword: z.optional(
      z.string().min(8, "Password must contain at least 8 character(s)")
    ),
    role: z.optional(z.string()),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"], // path of error
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) return false;
      return true;
    },
    {
      message: "Password is required",
      path: ["password"], // path of error
    }
  );
