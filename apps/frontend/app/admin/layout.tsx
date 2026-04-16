import DesktopNav from "@/components/admin/DeskotpNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface text-on-surface font-sans overflow-x-hidden">
      <DesktopNav />

      {children}
    </div>
  );
}
