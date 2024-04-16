"use client";
import { useWallet } from "@txnlab/use-wallet";
import { createNft } from "../../nft/create_certificate";
import algosdk from "algosdk"
function Test() {
  const { signer, activeAddress, signTransactions, sendTransactions } =
    useWallet();

  async function handleCreate() {
    try {
      if (!activeAddress) {
        alert("connect wallet");
        throw new Error("Please connect wallet");
      }
      const testob = {
        name: "ttrttrttrttr",
        asset_url:
          "https://images.pexels.com/photos/5750479/pexels-photo-5750479.jpeg?auto=compress&cs=tinysrgb&w=600",
        creator_address: activeAddress,
      };
      const txn = await createNft(testob);
      const encodedTransaction = algosdk.encodeUnsignedTransaction(txn)
      const signedTxn = await signTransactions([encodedTransaction])
      const waitRoundsToConfirm = 4
      const  result = await sendTransactions(signedTxn, waitRoundsToConfirm);
      
    } catch (e: any) {
      throw new Error(e);
    }
  }
  return (
    <div>
      <p>test</p>
      <button>create Nft</button>
    </div>
  );
}

export default Test;
