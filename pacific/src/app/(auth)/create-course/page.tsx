"use client"
import BackButton from '@/components/back-button'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input, Textarea } from '@/components/ui/input'
// import { useToast } from '@/components/ui/use-toast'
//import { UploadDropzone } from '@/lib/uploadthing'
// import { createCertificate } from ''
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from 'zod'


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
    coursename: z.string()    
})

type Schema = z.infer<typeof formSchema>

function CreateCourse() {
    const [loading, setLoading] = useState(false)
    //const { toast } = useToast()
    //const session = useSession();
    //const { privateKey } = usePrivateKey();
    //const [showDialog, setShowDialog] = useState(privateKey == null)
    const form = useForm<Schema>({
        resolver: zodResolver(formSchema)
    })


    const onSubmit = async (values: Schema) => {
        console.log("Values", values)
        setLoading(true)
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
        }
        catch (e) {
            // toast({
            //     variant: "destructive",
            //     title: "!Uh-oh",
            //     description: "Something went wrong"
            // })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col w-full h-full items-center  justify-center ">
            <div className="flex flex-row items-center justify-start w-full">
                <BackButton />
            </div>
            <div className="flex flex-col w-4/5  h-full items-center justify-center px-5 ">
                <h3 className='text-xl font-semibold ' >
                    Create Course
                </h3>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-full space-y-4' >
                        {/* Course Name */}
                        <FormField
                            control={form.control}
                            name='coursename'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Name of the course
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder='Course Name' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                                           
                        
                        <FormControl    >
                            <Button isLoading={loading} type="submit" >
                                Create
                            </Button>
                        </FormControl>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CreateCourse