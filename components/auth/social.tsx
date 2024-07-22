"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { useSearchParams } from "next/navigation";

const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const socialHanler = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex gap-x-2 items-center justify-center w-full">
      <Button
        size={"lg"}
        className="w-full"
        variant="outline"
        onClick={() => {
          socialHanler("google");
        }}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant="outline"
        onClick={() => {
          socialHanler("github");
        }}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
export default Social;
