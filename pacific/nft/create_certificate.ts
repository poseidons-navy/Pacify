import { client as algodClient } from "@/lib/algodClient";
import algosdk from "algosdk";
interface CreateNFT {
  creator_address: string;
  name: string;
  asset_url: string;
}
async function createNft(nft_details: CreateNFT): Promise<algosdk.Transaction> {
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from: nft_details.creator_address,
    suggestedParams,
    defaultFrozen: false,
    unitName: nft_details.name,
    assetName: nft_details.name,
    manager: nft_details.creator_address,
    reserve: nft_details.creator_address,
    freeze: nft_details.creator_address,
    clawback: nft_details.creator_address,
    assetURL: nft_details.asset_url,
    total: 1,
    decimals: 0,
  });
  return txn;
}
export { createNft };
