import { client as algodClient } from "@/lib/algodClient";
import algosdk from "algosdk";
import { getRegFromPubkey, getIndexFromReg } from "@/db/getions";
/**
 * Opt in to receive an asset
 * @param receiver_address string
 */
async function optIn(
  receiver_address: string,
  assetIndex: number
): Promise<algosdk.Transaction> {
  try {
    const suggestedParams = await algodClient.getTransactionParams().do();

    const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: receiver_address,
      to: receiver_address,
      suggestedParams,
      assetIndex,
      amount: 0,
    });
    return optInTxn;
  } catch (e: any) {
    console.log("Error occured during optin");
    throw new Error("Error occured during optin", e);
  }
}
async function transferNft(
  creator_address: string,
  receiver_address: string
): Promise<algosdk.Transaction> {
  const reg_no = await getRegFromPubkey(receiver_address);
  console.log("Reg No", reg_no);
  const assetIndex = await getIndexFromReg(reg_no);
  console.log("Asset Index", assetIndex);
  try {
    const suggestedParams = await algodClient.getTransactionParams().do();
    const xferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: creator_address,
      to: receiver_address,
      suggestedParams,
      assetIndex,
      amount: 1,
    });
    return xferTxn;
  } catch (e: any) {
    console.log("Error occure during transfer nft");
    throw new Error("Error occured during transfer nft", e);
  }
}
/**
 * Opt in to receive NFT
 * @param active_address string
 */
async function optInToReceiveNft(
  active_address: string
): Promise<algosdk.Transaction> {
  try {
    const reg_no = await getRegFromPubkey(active_address);
    const assetIndex = await getIndexFromReg(reg_no);
    //Opt in
    const transaction = await optIn(active_address, assetIndex);
    return transaction;
  } catch (e: any) {
    console.log("Error occured during optin function 2", e);
    throw new Error("Error occured during optin function 2", e);
  }
}

export { transferNft, optIn, optInToReceiveNft };
