"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import { getcertificates } from '@/server-actions/certificates';
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboardTopBar from "@/components/topbar/page";
import CertificateDetails from "@/components/certificate-details";
import {Certificate} from "@/types/certificate";
import { getCertificate } from "../../../../nft/get_certificate";
import {toast} from "sonner";
import {getUserDataFromLogin} from "@/db/getions";


function VerifyCertificate() {
  const [{ data, loading }, setcertificates] = useState<{
    data: Array<Certificate>;
    loading: boolean;
  }>({
    data: [],
    loading: false,
  });
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState<string>("");

  const handleSearch = async () => {
    setSearchLoading(true);
    if (search === undefined) {
      toast.error("insert serial number");
    }
    await loadStoreData(search);
    setSearchLoading(false);
  };

  const loadStoreData = async (serial_number: string) => {
    setcertificates((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    try {
      const certificates = await getCertificate(serial_number);
      console.log("Certificate", certificates);
      // setcertificates((prev) => {
      //   return {
      //     ...prev,
      //     data: certificates,
      //   };
      // });
    } catch (e) {
      // ignore
    } finally {
      setcertificates((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     loadStoreData();
  //   })();
  // }, []);

  return (
    <>
      <DashboardTopBar />
      <div className="w-11/12 h-80 flex flex-col items-center justify-start gap-y-4 bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="flex flex-row items-center justify-between w-full gap-x-3">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for certificate by serial number..."
          />
          <Button onClick={handleSearch}>
            <Search />
          </Button>
        </div>
        <p className="w-full text-left text-neutral-50">
          The certificate will be displayed below :)
        </p>
        <div className="flex flex-col w-full items-center gap-y-5">
          {data?.map((certificates, i) => {
            return (
              <CertificateDetails
                key={i}
                certificate={certificates}
                showRead={true}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default VerifyCertificate;
