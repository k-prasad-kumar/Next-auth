"use server";

import { currentUser } from "../current-user";

export const admin = async () => {
  const user = await currentUser();

  if (user?.role !== "admin") return { error: "Forbidden Server Route!" };

  return { success: "Allowed Server Route" };
};
