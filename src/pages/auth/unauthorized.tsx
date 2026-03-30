import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Empty className="min-h-screen">
      <EmptyHeader>
        <EmptyMedia>
          <Lock className="size-8" />
        </EmptyMedia>
        <EmptyTitle className="flex flex-col items-center">Unauthorized Access</EmptyTitle>
        <EmptyDescription>
          You don&apos;t have permission to access this resource. Please sign in or contact
          your administrator.
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
