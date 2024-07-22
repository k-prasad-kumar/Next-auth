"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";

export const ProtectedNav = () => {
  const path = usePathname();
  const { data } = useSession();

  const user = data?.user;

  return (
    <div className="w-full flex gap-2 items-center justify-between py-4 my-2">
      <Button variant={path === "/client" ? "default" : "outline"} asChild>
        <Link href={"/client"}>Client</Link>
      </Button>

      <Button variant={path === "/server" ? "default" : "outline"} asChild>
        <Link href={"/server"}>Server</Link>
      </Button>

      <Button variant={path === "/admin" ? "default" : "outline"} asChild>
        <Link href={"/admin"}>Admin</Link>
      </Button>
      <Button variant={path === "/settings" ? "default" : "outline"} asChild>
        <Link href={"/settings"}>Settings</Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar>
            <AvatarImage src={user?.image!} alt="user" />
            <AvatarFallback>
              <PersonIcon />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">
            <PersonIcon /> &nbsp; Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <GearIcon /> &nbsp; Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => signOut()}
          >
            <ExitIcon /> &nbsp; Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
