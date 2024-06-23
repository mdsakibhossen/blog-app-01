import LogoutButton from "@/components/logout-button/LogoutButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth();
  // console.log("session:",session);
  !session?.user && redirect("/login");

  return (
    <div className="grid place-items-center min-h-screen justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1>Dashboard</h1>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Dashboard;

/* 
  *****For Client Side Session Management*****
  "use client";
  import { useSession } from "next-auth/react";
  import { useRouter } from "next/navigation";
  import Loading from "../loading";
  import { useEffect } from "react";
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    status === "unauthenticated" && router.push("/login");
  }, [status]);
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "authenticated") { return MAIN_CODE}


  *****For Server Side Session Management*****

  import { auth } from "@/lib/auth";
  import { redirect } from "next/navigation";

  const session = await auth();
  console.log("session:",session);
  !session?.user && redirect("/login");

  return MAIN_CODE
*/
