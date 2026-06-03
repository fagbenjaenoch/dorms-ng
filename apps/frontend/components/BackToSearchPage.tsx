import { BiArrowBack } from "react-icons/bi";
import { Button } from "./ui/button";

export default function BackToSearchPageButton() {
  return (
    <Button className="flex gap-2" onClick={() => history.back()}>
      <BiArrowBack />
      Back to search page
    </Button>
  );
}
