"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input} from '@/components/ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { UploadDropzone } from '@/components/uploadthing/uploadthing'
import DashboardTopBar from '@/components/topbar/page'

const formSchema = z.object({
    registrationNo: z.string(),
    coursename: z.string(),
    serial_number: z.number(),
    certificate_url: z.string(),
    
})
const coursesList = [
    { value: 'math', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'history', label: 'History' },
    // Add more courses as needed
  ];

type Schema = z.infer<typeof formSchema>

function CreateStore() {
    const [loading, setLoading] = useState(false)
    //const { toast } = useToast()
    //const session = useSession();
    const form = useForm<Schema>({
        resolver: zodResolver(formSchema)
    })


    const onSubmit = async (values: Schema) => {
        console.log("Values", values)
        setLoading(true)
        try {

           
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
        <>
        <DashboardTopBar/>
        <div className="flex flex-col w-full h-full items-center  justify-center ">
            <div className="flex flex-row items-center justify-start w-full">
            </div>
            <div className="flex flex-col w-4/5  h-full items-center justify-center px-5 ">
                <h3 className='text-xl font-semibold ' >
                    Assign Certificate
                </h3>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-full space-y-4' >
                        {/* registration number */}
                        <FormField
                            control={form.control}
                            name='registrationNo'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Student's Registration Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='Reg no' type=" number" />
                                        </FormControl>
                     
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

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
                                        <Select>
                                            <SelectTrigger>
                                                {field.value ? (
                                                coursesList.find((course) => course.value === field.value)?.label
                                                ) : (
                                                'Select a course'
                                                )}
                                            </SelectTrigger>
                                            <SelectContent>
                                                {coursesList.map((course) => (
                                                <SelectItem
                                                    key={course.value}
                                                    value={course.value}
                                                    onSelect={() => handleSelectChange(course.value)}
                                                >
                                                    {course.label}
                                                </SelectItem>
                                                ))}
                                            </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                                           

                        
                        {/* Serial number */}
                        <FormField
                            control={form.control}
                            name='serial_number'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Certificate's Serial Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='Serial Number' type=" number" />
                                        </FormControl>
                     
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        {/* certificate pdf upload*/}
                         <FormField
                            control={form.control}
                            name='certificate_url'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            The Certificate PDF/Image <i>(file should not exceed 4MB)</i>
                                        </FormLabel>
                                        <FormControl>
                                            <UploadDropzone
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
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        
                        <FormControl    >
                            <Button isLoading={loading} type="submit" >
                                Assign
                            </Button>
                        </FormControl>
                    </form>
                </Form>
            </div>
        </div></>
    )
}

export default CreateStore