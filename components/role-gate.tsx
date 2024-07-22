"use client";

import FormError from "./form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: string;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  if (allowedRole !== "admin")
    return <FormError message="You are not allowed to access this content!" />;
  return <div className="text-center">{children}</div>;
};
