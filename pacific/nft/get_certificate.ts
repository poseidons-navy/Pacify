import { client as algodClient } from "@/lib/algodClient";
import { getIndexFromDb } from "@/db/getions";
export async function getNft(assetIndex: number) {
  const assetInfo = await algodClient.getAssetByID(assetIndex).do();
  return assetInfo;
}
/**
 * Provided with the serial_no, this function returns the certificate Nft
 * @param serial_no String
 */
export async function getCertificate(serial_no: string) {
  console.log("Serial Number", serial_no)
  const asset_index = await getIndexFromDb(serial_no);

  if (asset_index === undefined || asset_index === null) {
    throw "Certificate Does Not Exist";
  }

  console.log("Asset Index", asset_index);
  const cert_nft = getNft(asset_index);
  console.log("Certificate NFT", cert_nft);
  return cert_nft;
}
