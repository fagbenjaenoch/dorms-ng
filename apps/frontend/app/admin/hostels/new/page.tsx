"use client";

import CreateHostelListingForm from "@/components/admin/CreateHostelListingForm";
import DashboardHeader from "@/components/admin/DashboardHeader";

export default function CreateHostelListing() {
  return (
    <main className="grow md:ml-64 min-h-screen">
      <DashboardHeader title="Manage Hostels" />

      <div className="p-4 sm:p-8 max-w-6xl mx-auto pb-32">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface mb-2">
              Create Hostel <span className="text-primary">Listing</span>
            </h1>
            <p className="text-on-surface-variant font-medium">
              Add a new student sanctuary to the Emerald Horizon ecosystem.
            </p>
          </div>
        </div>

        <CreateHostelListingForm />
      </div>
    </main>
  );
}
