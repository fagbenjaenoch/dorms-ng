import { GraduationCapIcon } from "lucide-react";
import { MdApartment } from "react-icons/md";

export const EntityTypeToIcon: Record<string, React.ReactNode> = {
  hostel: (
    <span className="bg-secondary/10 px-3 py-3 flex items-center rounded-md">
      <MdApartment className="text-secondary" size={15} />
    </span>
  ),
  institution: (
    <span className="bg-primary-light px-3 py-3 flex items-center rounded-md">
      <GraduationCapIcon className="text-primary" size={15} />
    </span>
  ),
  hostel_sm: (
    <span className="bg-secondary/10 px-1 py-1 flex items-center rounded-md">
      <MdApartment className="text-secondary" size={12} />
    </span>
  ),
  institution_sm: (
    <span className="bg-primary-light px-1 py-1 flex items-center rounded-md">
      <GraduationCapIcon className="text-primary" size={12} />
    </span>
  ),
};
