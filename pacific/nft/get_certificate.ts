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
  const asset_index = await getIndexFromDb(serial_no);
  const cert_nft = getNft(asset_index);
  return cert_nft;
}
