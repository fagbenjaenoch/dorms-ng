import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

import { Button } from "./ui/button";

export default function BackToSearchPageButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="flex text-sm md:text-base gap-2"
      onClick={() => router.back()}
    >
      <BiArrowBack />
      Back to search page
    </Button>
  );
}
