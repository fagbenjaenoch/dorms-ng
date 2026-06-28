import { FaRedo } from "react-icons/fa";
import { Button } from "./ui/button";
import { BsHouseSlashFill } from "react-icons/bs";

interface HostelResultsErrorProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function HostelResultsError({
  error,
  resetErrorBoundary,
}: HostelResultsErrorProps) {
  return (
    <div className="mx-auto max-w-3xl flex flex-col items-center gap-1 mt-20 p-4 text-muted-foreground">
      <BsHouseSlashFill size={30} className="mb-4" />
      <h1 className="text-lg font-bold">Could not get hostel results</h1>
      <Button
        onClick={resetErrorBoundary}
        size="xl"
        variant="ghost"
        className="flex items-center gap-2"
      >
        <FaRedo size={15} />
        Retry
      </Button>
    </div>
  );
}
