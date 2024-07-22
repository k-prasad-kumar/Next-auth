import { currentUser } from "@/lib/current-user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const user = await currentUser();
  if (user?.role !== "admin")
    return NextResponse.json({ error: "Api not" }, { status: 403 });

  return NextResponse.json({ success: "Accepted" }, { status: 200 });
};
