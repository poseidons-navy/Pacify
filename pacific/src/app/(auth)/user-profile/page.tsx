import { Button } from '@/components/ui/button'
//import { getServerAuthSession } from '@/server/auth'
//import { getPurchasedBooks } from '@/server/publication'
//import { isNull } from 'lodash'
import { UserIcon} from 'lucide-react'
import React from 'react'
// import { fetchBalance } from '@/server/publication'
import Link from 'next/link'
import DashboardTopBar from '@/components/topbar/page'

async function ProfilePage() {
    // const session = await getServerAuthSession()
    // const user = session?.user
    // // let publications: Array<Publication & { creator: User | null } | null> = []
    // // let purchaseHistory: Array<Purchase & {creator: User | null} | null> = []
    // let purchaseHistory: Array<any> = [];
    // let balance = 0;
    // if(isNull(user?.walletAddress)) {
    //     return  (
    //         link='/setup-wallet'
    // )
    // }

    
    

    

  return (
    <>
    <DashboardTopBar/>
    <div className="flex flex-col items-center justify-centet space-y-10 px-2 pb-[100px] w-11/12">
        {/* Wallet Section */}
        <div className="flex flex-col w-full space-y-5 ring-1 ring-amber-100 rounded-md shadow-lg px-5 py-5 ">
                <h2 className='text-xl font-semibold' >
                    Your Crypto Wallet
                </h2>
                <div className="grid grid-cols-4 w-full gap-y-4">
                    <div className="col-span-4 flex flex-row items-center justify-between">
                        {/* <div className="flex flex-row items-center gap-x-5">
                            <Wallet/>
                            <span className="font-semibold text-lg">
                                Current Balance
                            </span>
                        </div>
                        <span>
                            {balance} Algo | {(balance * 0.14).toFixed(2)} USD
                        </span> */}
                    </div>
                    {/* <CopyText
                        className='col-span-4'
                        text={user.walletAddress ?? ""}
                        title={"Account Address"}
                        icon='BookUser'
                        defaultView
                    />
                    <DecryptPrivateKey visible={true}/> */}
                </div>
        </div>
        
        {/*Create or Join Existing league*/}
        <div className='flex flex-row items-center gap-x-4 w-full'>
    
        <Link href="/dashboard/store/new" legacyBehavior>
        <Button>
            View certificates
        </Button>
        </Link>
        </div>
        {/* Purchase History */}
        <div className="flex flex-col gap-y-4 w-full px-5 py-5">
            <div className="flex flex-row items-center gap-x-4 w-full">
                    <UserIcon stroke='gray' />
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