"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  label: string;
  link: string;
}

const BackButton = ({ label, link }: BackButtonProps) => {
  return (
    <Button variant={"link"} size={"sm"} className="text-sm w-full" asChild>
      <Link href={link}>{label}</Link>
    </Button>
  );
};
export default BackButton;
