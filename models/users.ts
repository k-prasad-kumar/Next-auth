import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
    emailVerified: {
      type: Date,
      default: null,
    },
    image: {
      type: String,
      default: "",
    },
    isTwoFactorEnabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);

//  user signin email verification token schema
const verificationTokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const VerificationToken =
  mongoose.models?.VerificationToken ||
  mongoose.model("VerificationToken", verificationTokenSchema);

//  user signin email verification token schema
const twoFactorTokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const TwoFactorToken =
  mongoose.models?.TwoFactorToken ||
  mongoose.model("TwoFactorToken", twoFactorTokenSchema);

//  user signin email verification token schema
const twoFactorConfirmationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const TwoFactorConfirmation =
  mongoose.models?.TwoFactorConfirmation ||
  mongoose.model("TwoFactorConfirmation", twoFactorConfirmationSchema);

// password reset verification token schema
const resetPasswordTokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const ResetPasswordToken =
  mongoose.models?.resetPasswordToken ||
  mongoose.model("resetPasswordToken", resetPasswordTokenSchema);
