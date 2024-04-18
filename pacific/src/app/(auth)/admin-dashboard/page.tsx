"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Certificate } from "crypto";
import { PlusIcon, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DashboardTopBar from "@/components/topbar/page";

function AdminPage() {
  const [search, setSearch] = useState<string>();
  const [searchLoading, setSearchLoading] = useState(false);

  const [{ data, loading }, setPublications] = useState<{
    data: Array<Certificate & { creator: Admin | null }>;
    loading: boolean;
  }>({
    data: [],
    loading: false,
  });

  const loadStoreData = async (status?: any) => {
    setCertificates((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    try {
      const certifications = await getCurrentUserCertificates(
        search,
        status == "all" ? undefined : status,
      );

      setcertificates((prev) => {
        return {
          ...prev,
          data: certifications,
        };
      });
    } catch (e) {
      // ignore
    } finally {
      setPublications((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
    }
  };

  const handleChangeStatus = async (value: string) => {
    await loadStoreData(value);
  };

  const handleSearch = async () => {
    setSearchLoading(true);
    await loadStoreData();
    setSearchLoading(false);
  };

  useEffect(() => {
    (async () => {
      loadStoreData();
    })();
  }, []);

  return (
    <>
      <DashboardTopBar />
      <div className="flex flex-col w-11/12 items-center pt-5 gap-y-4">
        <Link href="./create-course" legacyBehavior>
          <Button>Create a new course</Button>
        </Link>
        <h3 className="font-semibold text-xl w-full">
          Certificates you have issued
        </h3>

        <Link href="/assign-certificate" legacyBehavior>
          <div className="flex cursor-pointer shadow-sm hover:bg-slate-100 flex-col items-center justify-center w-full rounded-md h-[100px] ring-1 ring-amber-50 ">
            <PlusIcon />
            <span>Issue a new certificate</span>
          </div>
        </Link>

        <div className="flex flex-row w-full items-center justify-between gap-x-4">
          <div className="flex flex-row items-center justify-center gap-x-3 w-4/5 ">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for your certificates by serial number"
            />
            <Button
              onClick={handleSearch}
              variant={"outline"}
              isLoading={searchLoading}
            >
              <Search />
            </Button>
          </div>
          <div className="flex flex-row items-center justify-center gap-x-3">
            <Select
              onValueChange={(value) => {
                console.log("Value", value);
                handleChangeStatus(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="published">Issued</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {!loading && (
          <div className="flex flex-col w-full items-center gap-y-5">
            {data?.map((certificate, i) => {
              return (
                <CertificateDetails
                  key={i}
                  publication={certificate}
                  showRead={true}
                />
              );
            })}
          </div>
        )}
        {loading && (
          <div className="flex flex-col w-full items-center gap-y-5">
            <div className="w-full rounded-md bg-slate-100 animate-pulse h-[300px] shadow-sm"></div>
            <div className="w-full rounded-md bg-slate-100 animate-pulse h-[300px] shadow-sm"></div>
            <div className="w-full rounded-md bg-slate-100 animate-pulse h-[300px] shadow-sm"></div>
            <div className="w-full rounded-md bg-slate-100 animate-pulse h-[300px] shadow-sm"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminPage;
