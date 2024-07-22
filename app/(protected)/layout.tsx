import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ProtectedNav } from "@/components/protected-nav";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="w-full md:w-1/2 l:w-1/3 flex flex-col justify-center items-center mx-auto">
        <ProtectedNav />
        <hr />
        {children}
      </div>
    </SessionProvider>
  );
};

export default Layout;
