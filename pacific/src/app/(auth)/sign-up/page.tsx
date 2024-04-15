import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StudentSignUpForm } from "./_components/student-sign-up";
export default function StudentSignUpPage() {
  return (
    <div className="">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Create Student Account</CardTitle>
          <CardDescription>
            Enter all the details to create a student account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudentSignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
