import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter the student email address"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter the full name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reg_no">Registration Number</Label>
                <Input
                  id="reg_no"
                  type="text"
                  name="reg_no"
                  placeholder="Enter the registration number"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
