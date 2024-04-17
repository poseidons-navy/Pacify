import { StudentSignUpForm } from "./_components/student-sign-up";
import { CardForm } from "@/components/card-form";
export default function StudentSignUpPage() {
  return (
    <div className="">
      <CardForm
        title={"Create Student Account"}
        description={"Enter all the details to create a student account"}
      >
        <StudentSignUpForm />
      </CardForm>
    </div>
  );
}
