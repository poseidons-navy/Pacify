import algosdk from "algosdk"

export const config = {

    algodToken: "",

    algodServer: "https://testnet-api.algonode.network",

    algodPort: "",

    indexerToken: "",

    indexerServer: "https://testnet-idx.algonode.network",

    indexerPort: "",

}
export const client = new algosdk.Algodv2(config.algodToken, config.algodServer, config.algodPort);