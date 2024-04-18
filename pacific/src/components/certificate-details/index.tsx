"use client";
import Image from "next/image";
import React from "react";
import { Certificate } from "@/types/certificate";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function CertificateDetails({
  certificate,
  
}: {
  certificate: Record<string, any>;
}) {
  return (
    <div className="grid grid-cols-5 w-full px-5 py-4 rounded-sm ring-1 ring-amber-100 shadow-md gap-x-4 gap-y-4">
      {/* Certificate Cover */}
      <div className="w-[120px] h-[180px] overflow-hidden relative ring-1">
        <Image
          src={certificate.params.url}
          layout="fill"
          objectFit="cover"
          alt="certificate"
        />

      </div>
      {/* Certificate  transaction id*/}
      <Button variant={"secondary"}>
        <Link href={`https://app.dappflow.org/explorer/transaction/${certificate.tx_hash}`}>View Transaction</Link>
      </Button>
      {/* Certificate Details 
      <div className="flex flex-col col-span-4 gap-y-2 w-full">
        <h3 className="w-full text-xl font-semibold">{student_reg_number}</h3>
        <span>{course_name}</span>
        <p>{certificate_serial_number}</p>
        <p>{university_name}</p>
      </div>*/}
    </div>
  );
}

export default CertificateDetails;
