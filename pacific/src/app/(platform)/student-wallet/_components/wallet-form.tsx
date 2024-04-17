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
  FormDescription,
} from "@/components/ui/form";
import { addStudentWalletToDB } from "@/server-actions/creations";
import { connectWalletSchema } from "@/validation/students";
const ConnectWalletForm = () => {
  const form = useForm<z.infer<typeof connectWalletSchema>>({
    resolver: zodResolver(connectWalletSchema),
    defaultValues: {
      registrationNumber: "",
      walletAddress: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof connectWalletSchema>) => {
    try {
      await addStudentWalletToDB(values);
      toast.success(" Successfully added");
      form.reset({
        registrationNumber: "",
        walletAddress: "",
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the registration Number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Don&apos;t put any slashes \</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="walletAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the name of the wallet address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Connect wallet
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { ConnectWalletForm };
