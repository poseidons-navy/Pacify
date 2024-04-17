import { CardForm } from "@/components/card-form";
import { CreateInstitutionForm } from "./_components/institution-form";

export default function CreateInstitutionPage() {
  return (
    <div className="flex justify-center   h-full ">
      <CardForm
        title="
      Create Institution
      "
        description="
      Enter the name of the institution and connect your wallet
      "
      >
        <CreateInstitutionForm />
      </CardForm>
    </div>
  );
}
