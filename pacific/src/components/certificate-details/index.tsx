"use client"
import Image from 'next/image';
import React from 'react';
import { Certificate } from '@/types/certificate';

interface Props {
    certificate: Certificate;
    showRead: boolean;
}

function CertificateDetails(props: Props) {
    const { certificate} = props;
            
    const { certificate_image_url, student_reg_number, course_name, certificate_serial_number, university_name} = certificate;

    return (
        <div className="grid grid-cols-5 w-full px-5 py-4 rounded-sm ring-1 ring-amber-100 shadow-md gap-x-4 gap-y-4">
            {/* Certificate Cover */}
            <div className="w-[120px] h-[180px] overflow-hidden relative ring-1">
                <Image
                    src={certificate_image_url ?? ""}
                    layout="fill"
                    objectFit="cover"
                    alt={student_reg_number ?? ""}
                />
            </div>

            {/* Certificate Details */}
            <div className="flex flex-col col-span-4 gap-y-2 w-full">
                <h3 className="w-full text-xl font-semibold">{student_reg_number}</h3>
                <span>{course_name}</span>
                <p>{certificate_serial_number}</p>
                <p>{university_name}</p>
            </div>
        </div>
    );
}

export default CertificateDetails;
