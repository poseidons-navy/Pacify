"use client"
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { UserProfile } from "./_components/user-profile";
import DashboardTopBar from "@/components/topbar/page";
import { useWallet } from "@txnlab/use-wallet";
import {toast} from "sonner";
import {optInToReceiveNft} from "../../../../nft/transfer_certificate";
import algosdk from "algosdk";


function ProfilePage() {
  const { activeAddress, signTransactions, sendTransactions } = useWallet();
  async function optIn() {
    try {
      if (!activeAddress) {
        toast.error("please connect your wallet");
        return;
      }

      // Create NFT
      const txn = await optInToReceiveNft(activeAddress);
      const encodedTransaction = algosdk.encodeUnsignedTransaction(txn);
      const signedTxn = await signTransactions([encodedTransaction]);
      const waitRoundsToConfirm = 4;
      const result = await sendTransactions(signedTxn, waitRoundsToConfirm);
    } catch (error) {
      toast.error("Unable to opt in");
    }
  }


  return (
    <>
      <DashboardTopBar />
      <div className="flex flex-col items-center justify-centet space-y-10 px-2 pb-[100px] w-11/12">
        <div className="flex flex-row items-center  w-full">
          {/*<Link href="./verify-certificate" legacyBehavior>
            <Button>View certificates</Button>
          </Link>*/}
          <Button onClick={optIn}>Opt in</Button>
        </div>
        {/* Profile */}
        <UserProfile />
      </div>
    </>
  );
}

export default ProfilePage;
