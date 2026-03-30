import Main from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useUserActions, useUserCheckFundraiserRoleRequest } from "@/hooks/user/use-users";
import { Award, Loader2 } from "lucide-react";

export default function FundraiserRequestPage() {
  const { data: roleRequest } = useUserCheckFundraiserRoleRequest();

  const { fundraiserRoleRequest } = useUserActions();
  const { mutateAsync, isPending } = fundraiserRoleRequest;

  const handleFundraiser = async () => {
    await mutateAsync();
  };

  return (
    <Main className="flex flex-col gap-4 px-8">
      <Card className="items-center py-20">
        <CardContent className="flex flex-col gap-2 items-center">
          <Award className="size-15" />
          <h3 className="text-xl font-semibold">Spread Kindness</h3>
          <p className="text-muted-foreground">Join us to help those in need.</p>
        </CardContent>
        <CardFooter>
          {roleRequest?.status ? (
            <Button>Waiting to approval</Button>
          ) : (
            <Button onClick={handleFundraiser}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Become Fundraiser"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </Main>
  );
}
