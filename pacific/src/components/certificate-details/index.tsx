"use client";
import Image from "next/image";
import React from "react";
import { Certificate } from "@/types/certificate";

/*interface Props {
  certificate: Certificate;
}*/

//THIS IS THE STRUCTURE OF THE DATA BEING BROUGHT BACK
/*
index
: 
1757824308
params
: 
clawback
: 
"DFSEHIAFD5AUKHK3NIXBGZ3Q5SEVDH34ABDNZFQ3PNCZV4FW6KCT33KC74"
creator
: 
"DFSEHIAFD5AUKHK3NIXBGZ3Q5SEVDH34ABDNZFQ3PNCZV4FW6KCT33KC74"
decimals
: 
0
default-frozen
: 
false
freeze
: 
"DFSEHIAFD5AUKHK3NIXBGZ3Q5SEVDH34ABDNZFQ3PNCZV4FW6KCT33KC74"
manager
: 
"DFSEHIAFD5AUKHK3NIXBGZ3Q5SEVDH34ABDNZFQ3PNCZV4FW6KCT33KC74"
name
: 
"123456789"
name-b64
: 
"MTIzNDU2Nzg5"
reserve
: 
"DFSEHIAFD5AUKHK3NIXBGZ3Q5SEVDH34ABDNZFQ3PNCZV4FW6KCT33KC74"
total
: 
1
url
: 
"https://utfs.io/f/312672a6-007b-48c9-8368-9663ca04fc73-iszwji.jpeg"
url-b64
: 
"aHR0cHM6Ly91dGZzLmlvL2YvMzEyNjcyYTYtMDA3Yi00OGM5LTgzNjgtOTY2M2NhMDRmYzczLWlzendqaS5qcGVn"
Object*/

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
      <p className="text-white">{certificate.tx_hash}</p>
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
