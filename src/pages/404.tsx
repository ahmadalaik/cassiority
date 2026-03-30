import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Empty className="min-h-screen">
      <EmptyHeader>
        <EmptyTitle className="flex flex-col items-center">Page Not Found</EmptyTitle>
        <EmptyDescription>
          Sorry we couldn't find the page you're looking for.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" onClick={() => navigate("/")}>
          Go Back Home
        </Button>
      </EmptyContent>
    </Empty>
  );
}
