import { FaRedo } from "react-icons/fa";
import { Button } from "./ui/button";

interface HostelResultsErrorProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function HostelResultsError({
  error,
  resetErrorBoundary,
}: HostelResultsErrorProps) {
  return (
    <div className="mx-auto max-w-3xl flex flex-col items-center gap-1 p-4 text-muted-foreground">
      <h1 className="text-lg font-bold">Could not get hostel results</h1>
      <p>Error: {error.message}</p>
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
