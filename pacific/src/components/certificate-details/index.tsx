"use client";
import Image from "next/image";
import React from "react";

function CertificateDetails({
  certificate,
}: {
  certificate: Record<string, any>;
}) {
  return (
    <div className="grid  w-full justify-center p-2 rounded-sm ring-1 ring-amber-100 shadow-md">
      {/* Certificate Cover */}
      <div className="w-40 h-40  overflow-hidden relative ring-1">
        <Image
          src={certificate.params.url}
          layout="fill"
          objectFit="cover"
          alt="certificate"
        />
      </div>
    </div>
  );
}

export default CertificateDetails;
