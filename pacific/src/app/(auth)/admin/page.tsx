import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { AdminSignUpForm } from "./components/school-admin-signup";
  export default function StudentSignUpPage() {
    return (
      <div className="">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Create School Account</CardTitle>
            <CardDescription>
              Enter all the details to create a School Account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminSignUpForm />
          </CardContent>
        </Card>
      </div>
    );
  }
  