import { Button } from '@/components/ui/button'
import { UserIcon} from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import DashboardTopBar from '@/components/topbar/page'

async function ProfilePage() {
return (
    <>
    <DashboardTopBar/>
    <div className="flex flex-col items-center justify-centet space-y-10 px-2 pb-[100px] w-11/12">
        
        <div className='flex flex-row items-center gap-x-4 w-full'>
    
        <Link href="./verify-certificate" legacyBehavior>
        <Button>
            View certificates
        </Button>
        </Link>
        </div>
        {/* Profile */}
        <div className="flex justify-center flex-col gap-y-4 w-full px-5 py-0">
            <div className="flex flex-row justify-center items-center gap-x-4 w-full">
                    <UserIcon stroke='black' />
                    <h2 className="text-lg font-semibold">
                        My Profile
                    </h2>
                    
            </div>

        </div>        
    </div>
    </>
  )
}

export default ProfilePage