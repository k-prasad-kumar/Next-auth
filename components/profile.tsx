"use client";

import { Badge } from "@/components/ui/badge";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { LockOpen2Icon } from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const Profile = ({ user }: any) => {
  return (
    <Card>
      <CardHeader>Profile</CardHeader>
      <CardContent>
        <div className="w-full flex items-center">
          <div className="w-full space-y-4">
            <p>Full Name :</p>
            <p>Email :</p>
            <p>Role :</p>
            <p>Two Factor Authentication :</p>
          </div>

          <div className="w-full text-right space-y-4">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p className="capitalize">{user.role}</p>

            {user.isTwoFactorEnabled ? (
              <Badge variant="success">
                <LockClosedIcon /> &nbsp; ON
              </Badge>
            ) : (
              <Badge variant="destructive">
                {" "}
                <LockOpen2Icon /> &nbsp; OFF
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
