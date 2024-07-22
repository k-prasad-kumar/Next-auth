"use client";

import { Profile } from "@/components/profile";
import { useSession } from "next-auth/react";

const ClientPage = () => {
  const session = useSession();
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl font-medium tracking-wide text-center py-4">
        Client Profile Page
      </h1>
      <Profile user={session?.data?.user} />
    </div>
  );
};
export default ClientPage;
