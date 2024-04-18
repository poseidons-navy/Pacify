import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { UserProfile } from "./_components/user-profile";
import DashboardTopBar from "@/components/topbar/page";

async function ProfilePage() {
  return (
    <>
      <DashboardTopBar />
      <div className="flex flex-col items-center justify-centet space-y-10 px-2 pb-[100px] w-11/12">
        <div className="flex flex-row items-center  w-full">
          {/*<Link href="./verify-certificate" legacyBehavior>
            <Button>View certificates</Button>
          </Link>*/}
          <Button>Opt in</Button>
        </div>
        {/* Profile */}
        <UserProfile />
      </div>
    </>
  );
}

export default ProfilePage;
