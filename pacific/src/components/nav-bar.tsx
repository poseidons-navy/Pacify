"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavBar() {

  return (

      <div className="flex flex-row w-full items-center justify-center gap-y-2">
        <Link href="/">
          <Button className="gap-x-3" variant={"default"}>
            <span className="font-semibold">Home</span>
          </Button>
        </Link>

        <Link href="/user-profile">
          <Button className="ml-4 gap-x-5" variant={"default"}>
            <span className="font-semibold">Student Profile</span>
          </Button>
        </Link>
        <Link href="/admin-dashboard">
          <Button className="ml-4 gap-x-5" variant={"default"}>
            <span className="font-semibold">Institution Profile</span>
          </Button>
        </Link>
      </div>

  );
}
