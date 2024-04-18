"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
export const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = (serial_no: string) => {
    const params = new URLSearchParams(searchParams);

    if (serial_no) {
      params.set("query", serial_no);
    } else {
      params.delete("query");
    }
    //update url
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex flex-row items-center justify-between w-full gap-x-3">
      <Input
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search for certificate by serial number..."
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
};
