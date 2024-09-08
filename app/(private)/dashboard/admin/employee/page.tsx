import EmployeeForm from "@/app/components/EmployeeForm";

export default function EmployeePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Panel de Administración
      </h1>
      <EmployeeForm />
    </div>
  );
}
