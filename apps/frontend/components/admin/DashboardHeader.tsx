import { Bell, Settings } from "lucide-react";
import { Button } from "../ui/button";
import Search from "./Search";
import Image from "next/image";

interface DashboardHeaderProps {
  title: string;
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="bg-white/70 backdrop-blur-md sticky top-0 z-40 shadow-sm flex justify-between items-center w-full px-8 py-4 border-b border-surface-container">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-black text-primary tracking-tight">{title}</span>
      </div>
      <div className="flex items-center gap-3">
        <Search />
        <Button variant="ghost">
          <Bell size={20} />
        </Button>
        <Button variant="ghost">
          <Settings size={20} />
        </Button>
        <div className="flex items-center gap-3 pl-4 border-l">
          <Image
            alt="Administrator profile"
            width={100}
            height={100}
            className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdf2h4yx7EGENFDiKWqrip5N93usWX-5RjXmKqIdI260XOBGNIYzIDcyJrHCYlWyeGJjh3aihhjhhZnm4eWim-53Jg58l1cVyK97McN6GcSIFIm0w5w-dJyvhWD4-1Y1YYxOOP-sTqW_Oqf9cuNrMtW1fo4GZ4a7GyUC6EN6QZ7actA1LSdiskiBJhYHKInNXYq1xzsQ5F9TLb6aGHmfaBcK6RMfyFNYHCKWjmuJRLzNnG0YFA_mrrR2Sjao2hNQlH38IGYIx-54oB"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
