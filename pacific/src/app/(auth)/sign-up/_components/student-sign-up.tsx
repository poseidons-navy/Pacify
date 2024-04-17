"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { createStudentAccount } from "@/server-actions/creations";
import { createStudentSchema } from "@/validation/students";
import { universityCourses } from "@/constants/courses";

const StudentSignUpForm = () => {
  const form = useForm<z.infer<typeof createStudentSchema>>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      email: "",
      name: "",
      registrationNumber: "",
      universityName: "",
      courseName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createStudentSchema>) => {
    try {
      await createStudentAccount(values);
      toast.success("Student account has been created successfully");
      form.reset({
        email: "",
        name: "",
        registrationNumber: "",
        courseName: "",
        universityName: "",
      });
    } catch (error) {
      toast.error("Unable to create the account");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the student email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormDescription className="px-2 text-black">
                  Don&apos;t put any slashes
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="universityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the name of the university"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="courseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {universityCourses.map((course, index) => (
                      <SelectItem key={index} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create an account
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { StudentSignUpForm };
