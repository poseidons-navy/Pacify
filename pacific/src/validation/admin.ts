import z from "zod";

export const createAdminSchema = z.object({
  name: z.string({ required_error: "Please input a name." }).min(2).max(50),
  walletAddress: z.string({ required_error: "Please input a wallet address." }),
});
