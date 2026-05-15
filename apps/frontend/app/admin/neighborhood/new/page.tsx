import CreateNeighborhoodForm from "@/components/admin/CreateNeighborhood";
import DashboardHeader from "@/components/admin/DashboardHeader";

export const metadata = {
  title: "Create Neighborhood",
  description: "Create a new neighborhood",
};

export default function CreateNeighborhoodPage() {
  return (
    <div className="flex-1 ml-64 min-h-screen relative">
      <DashboardHeader title="Manage Neighborhoods" />

      <div className="p-10 max-w-6xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter mb-2">
              Create <span className="text-primary">Neighborhood</span>
            </h1>
            <p className="font-medium">Create a new neighborhood</p>
          </div>
        </div>

        <CreateNeighborhoodForm />
      </div>
    </div>
  );
}
