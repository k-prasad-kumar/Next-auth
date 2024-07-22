import { Profile } from "@/components/profile";
import { currentUser } from "@/lib/current-user";

const ServerPage = async () => {
  const user = await currentUser();

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl font-medium tracking-wide text-center py-4">
        Server Profile Page
      </h1>
      <Profile user={user} />
    </div>
  );
};
export default ServerPage;
