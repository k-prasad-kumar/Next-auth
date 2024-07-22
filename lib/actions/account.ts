"use server";

import clientPromise from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const client = (await clientPromise).db("next-auth");
    const account = await client
      .collection("accounts")
      .findOne({ userId: userId });

    return account;
  } catch (error) {
    return null;
  }
};
