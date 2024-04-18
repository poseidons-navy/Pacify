"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { FileEdit, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'


interface Props {
    certificates: Certificate & { creator: Admin | null }
    showRead: boolean
}

function CertificateDetails( props: Props) {
    const p = props       
    const { certificates: { certificate_url, registrationNo, coursename, serial_number }, showRead } = p
    const { data } = useSession()

  return (
    <div className="grid grid-cols-5 w-full px-5 py-4 rounded-sm ring-1 ring-amber-100 shadow-md gap-x-4 gap-y-4">

        {/* Certificate Cover */}
        <div className="w-[120px] h-[180px] overflow-hidden relative ring-1">
            <Image
                src={certificate_url ?? ""}
                fill
                style={{
                    objectFit: "cover"
                }}
                alt={registrationNo ?? ""}
            />
        </div>

        {/* Certificate Details */}
        <div className="flex flex-col col-span-4 gap-y-2 w-full">
            <h3 className='w-full text-xl font-semibold' >
                {registrationNo}
            </h3>
            
            <span>
                { coursename }
            </span>

            <p>{serial_number}</p>
            
        </div>

        {/* Action Buttons */}
        <div className=""></div>
        <div className="flex flex-row items-center col-span-3 gap-x-2 ">

            {/* <Interactions
                certificates={p.certificates}
                showRead={showRead}
            /> */}
            
            
        </div>
        {data?.user?.id === creator_id && <Link href={``} legacyBehavior >
            <Button variant={'outline'} >
                <FileEdit/>
            </Button>
        </Link>}
    </div>
  )
}

export default  CertificateDetails