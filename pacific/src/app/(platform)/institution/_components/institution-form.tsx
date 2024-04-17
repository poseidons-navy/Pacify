"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createTeachingInstitution } from "@/server-actions/creations";
import { createInstitutionSchema } from "@/validation/institution";
import { useWallet } from "@txnlab/use-wallet";

import { WalletPopover } from "@/components/wallet-popover";
import { useFormStatus } from "react-dom";
const CreateInstitutionForm = () => {
  const form = useForm<z.infer<typeof createInstitutionSchema>>({
    resolver: zodResolver(createInstitutionSchema),
    defaultValues: {
      name: "",
      walletAddress: "",
    },
  });
  const { activeAddress } = useWallet();
  const { pending } = useFormStatus();
  const onSubmit = async (values: z.infer<typeof createInstitutionSchema>) => {
    try {
      if (!activeAddress) {
        toast.error("please connect your wallet");
        return;
      }
      const data = {
        name: values.name,
        walletAddress: activeAddress,
      };
      await createTeachingInstitution(data);
      toast.success("the institution has been created successfully");
      form.reset({
        name: "",
        walletAddress: "",
      });
    } catch (error) {
      toast.error("Unable to create the institution");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the name of the institution"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex  items-center">
            <Button type="submit" className=" my-2" disabled={pending}>
              Create
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export { CreateInstitutionForm };
