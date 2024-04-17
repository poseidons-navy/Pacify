"use client";
import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, Textarea } from "@/components/ui/input";
// import { useToast } from '@/components/ui/use-toast'
//import { UploadDropzone } from '@/lib/uploadthing'
// import { createCertificate } from ''
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

// Algorand stuff
// import algosdk from 'algosdk'
// import {
//     algorandConfig,
//     CertificateAppNote,
//     numLocalBytes,
//     numGlobalBytes,
//     numGlobalInts,
//     numLocalInts,
//  } from '@/algorand/constants'

//const algodClient = new algosdk.Algodv2(algorandConfig.algodToken, algorandConfig.algodServer, algorandConfig.algodPort)

// Compile smart contract in .teal format to program
// const compileProgram = async (programSource: any) => {
//     let encoder = new TextEncoder();
//     let programBytes = encoder.encode(programSource);
//     let compileResponse = await algodClient.compile(programBytes).do();
//     return new Uint8Array(Buffer.from(compileResponse.result, "base64"));
// }

const formSchema = z.object({
  registrationNo: z.string(),
  coursename: z.string(),
  serial_number: z.number(),
  certificate_url: z.string(),
});

type Schema = z.infer<typeof formSchema>;

function CreateStore() {
  const [loading, setLoading] = useState(false);
  //const { toast } = useToast()
  //const session = useSession();
  //const { privateKey } = usePrivateKey();
  //const [showDialog, setShowDialog] = useState(privateKey == null)
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: Schema) => {
    console.log("Values", values);
    setLoading(true);
    try {
      //if (privateKey == null) throw Error("Deencrypt password")
      //const certificates = await createCertificate({
      //  ...values
      // })
      //if (session == null) throw Error("Not Logged In")
      // toast({
      //     title: "🎉 Success",
      //     description: "successfully created",
      // })
    } catch (e) {
      // toast({
      //     variant: "destructive",
      //     title: "!Uh-oh",
      //     description: "Something went wrong"
      // })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center  justify-center ">
      <div className="flex flex-row items-center justify-start w-full">
        <BackButton />
      </div>
      <div className="flex flex-col w-4/5  h-full items-center justify-center px-5 ">
        <h3 className="text-xl font-semibold ">Assign Certificate</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full h-full space-y-4"
          >
            {/* registration number */}
            <FormField
              control={form.control}
              name="registrationNo"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Student's Registration Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Reg no" type=" number" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Course Name */}
            <FormField
              control={form.control}
              name="coursename"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name of the course</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Course Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* serial number */}
            <FormField
              control={form.control}
              name="serial_number"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Certificate's serial number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Serial number"
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v !== "") {
                            const value = parseInt(v);

                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* certificate pdf upload*/}
            <FormField
              control={form.control}
              name="certificate_url"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      The Certificate PDF/Image{" "}
                      <i>(file should not exceed 4MB)</i>
                    </FormLabel>
                    <FormControl>
                      {/* <Textarea {...field} placeholder='Description' className='h-[100px]' /> */}
                      {/* <UploadDropzone
                                                endpoint='imageUploader'
                                                onClientUploadComplete={(uploads) => {
                                                    const upload = uploads?.at(-1)

                                                    if (upload) {
                                                        field.onChange(upload.url)
                                                        toast({
                                                            title: "Success!",
                                                            description: "Successfully uploaded the file"
                                                        })
                                                    }
                                                }}
                                                onUploadError={(e) => {
                                                    toast({
                                                        variant: "destructive",
                                                        title: "!Oops",
                                                        description: "File should not exceed 4MB"
                                                    })
                                                }}
                                            /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormControl>
              <Button isLoading={loading} type="submit">
                Assign
              </Button>
            </FormControl>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreateStore;
