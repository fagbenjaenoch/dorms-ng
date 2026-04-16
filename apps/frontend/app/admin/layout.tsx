import BrandIcon from "@/components/ui/BrandIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  GraduationCap,
  MapPin,
  Building2,
  CalendarDays,
  Plus,
  HelpCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";

const SidebarItem = ({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <Button
    variant="ghost"
    size="xl"
    onClick={onClick}
    className={cn(
      "cursor-pointer w-full mx-2 my-1 px-2 py-3 text-white/30 flex justify-start gap-3 rounded-xl transition-all ease-out hover:text-white hover:bg-primary",
      active && " text-orange-400",
    )}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </Button>
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface text-on-surface font-sans overflow-x-hidden">
      {/* Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col bg-primary shadow-2xl z-50">
        <div className="flex flex-col h-full py-6">
          <div className="px-6 mb-10">
            <Link href="/">
              <BrandIcon className="text-white font-bold" />
            </Link>
          </div>

          <nav className="flex-1 space-y-1 px-4">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" />
            <SidebarItem icon={GraduationCap} label="Universities" active />
            <SidebarItem icon={MapPin} label="Neighborhoods" />
            <SidebarItem icon={Building2} label="Hostels" />
            <SidebarItem icon={CalendarDays} label="Bookings" />
          </nav>

          <div className="mt-auto px-4 space-y-1">
            <Button
              size="xl"
              className="cursor-pointer mb-6 bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg flex items-center gap-2"
            >
              <Plus size={18} />
              Add New Listing
            </Button>
            <SidebarItem icon={HelpCircle} label="Support" />
            <SidebarItem icon={LogOut} label="Logout" />
          </div>
        </div>
      </aside>

      {children}
    </div>
  );
}
