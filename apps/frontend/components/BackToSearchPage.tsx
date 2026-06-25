import { BiArrowBack } from "react-icons/bi";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function BackToSearchPageButton() {
  const router = useRouter();

  return (
    <Button variant="ghost" className="flex gap-2" onClick={() => router.back()}>
      <BiArrowBack />
      Back to search page
    </Button>
  );
}
