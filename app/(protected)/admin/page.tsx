"use client";

import FormSuccess from "@/components/form-success";
import { RoleGate } from "@/components/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { admin } from "@/lib/actions/admin";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

const AdminPage = () => {
  const user = useSession();

  const apiRouteClick = () => {
    fetch("api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route");
      } else {
        toast.error("Forbidden API Route");
      }
    });
  };

  const serverActionClick = () => {
    admin().then((data) => {
      if (data?.error) {
        toast.error("Forbidden Server Action!");
      } else if (data?.success) {
        toast.success("Allowed Server Action");
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>🔑 Admin</CardHeader>
      <CardContent>
        <RoleGate allowedRole={user?.data?.user?.role}>
          <FormSuccess message="You are allowed to access this content." />
        </RoleGate>
        <div className="w-full shadow border rounded-md p-4 my-2 flex justify-between items-center text-sm">
          <p>Admin only API Route</p>
          <Button onClick={() => apiRouteClick()}>Click to Test</Button>
        </div>
        <div className="w-full shadow border rounded-md p-4 my-2 flex justify-between items-center text-sm">
          <p>Admin only Server Action</p>
          <Button onClick={() => serverActionClick()}>Click to Test</Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default AdminPage;
