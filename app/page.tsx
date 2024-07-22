import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col w-full md:w-1/3 justify-center items-center gap-4 px-4">
        <h1 className="text-4xl">🔐 Auth</h1>
        <p>A simple authentication service</p>
        <LoginButton>
          <Button size={"lg"}>Login</Button>
        </LoginButton>
      </div>
    </div>
  );
}
