"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
//import { getcertificates } from '@/server-actions/certificates';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
//import { Certificate, Admin } from '@prisma/client';
import DashboardTopBar from '@/components/topbar/page';

function VerifyCertificate() {
  const [{ data, loading }, setcertificates] = useState<{ data: Array<Certificate & { creator: Admin | null }>, loading: boolean }>({
    data: [],
    loading: false
  })
  const [searchLoading, setSearchLoading] = useState(false)
  const [search, setSearch] = useState<string>()

  const handleSearch = async () => {
    setSearchLoading(true)
    await loadStoreData(search)
    setSearchLoading(false)
  }



  const loadStoreData = async (search?: any) => {
    setcertificates((prev)=>{
      return {
        ...prev,
        loading: true
      }
    })
    try {
      const certificates = await getcertificates(search)

      setcertificates((prev)=>{
        return {
          ...prev,
          data: certificates
        }
      })
    }
    catch(e)
    {
      // ignore
    }
    finally
    {
      setcertificates((prev)=>{
        return {
          ...prev,
          loading: false
        }
      })
    }
  }


  useEffect(()=>{
    (async ()=>{
      loadStoreData()
    })()
  }, [])

  return (
    <><DashboardTopBar />
    <div className=" w-full h-full flex flex-col items-center justify-start gap-y-4 ">
        
        <div className="flex flex-row items-center justify-between w-full gap-x-3">
          <Input onChange={(e)=> setSearch(e.target.value)} placeholder='Search for certificate by serial number...' /> 
          <Button onClick={handleSearch} >
            <Search/>
          </Button>
        </div>
        <p className='w-full text-left' >
          The certificate will be displayed below :)
        </p>
        <div className="flex flex-col w-full items-center gap-y-5">
        {
          data?.map((certificates, i)=> {
            return  (
              <CertificateDetails
                key={i}
                publication={certificates}
                showRead={true}
              />
            )
          })
        }
      </div>
    </div>
    </>
  )
}

export default VerifyCertificate