import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";
import { ArrowRight, CalendarDays, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useSearchCampaignsByCategory } from "@/hooks/public/use-campaigns";
import { formatCurrency } from "@/lib/utils";

export default function CampaignsLanding() {
  const navigate = useNavigate();

  const { data: campaigns } = useSearchCampaignsByCategory("", 1);

  if (!campaigns) return;
  if (campaigns.data.length === 0) return;

  return (
    <section className="max-w-(--breakpoint-xl) mx-auto px-6 py-22">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-balance font-semibold text-4xl tracking-tight">
            The movement in progress
          </h2>
          <p className="mt-2 text-balance text-lg text-muted-foreground tracking-normal sm:text-xl">
            Support the causes that matter most. Every contribution, no matter the size, brings
            us closer to our goals.
          </p>
        </div>
      </div>

      <Separator className="mt-7 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.data.map((campaign, index) => {
          if (index > 3) return;
          const percentage = campaign.currentAmount / campaign.targetAmount;

          const targetDate = new Date(campaign.deadline);
          const today = new Date();
          const diffInMs: number = targetDate.getTime() - today.getTime();
          const daysLeft: number = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

          return (
            <Card key={campaign.id} className="overflow-hidden pt-0">
              <CardHeader className="p-0">
                <img
                  alt={campaign.title}
                  className="aspect-14/9 w-full"
                  src={
                    typeof campaign.image === "string"
                      ? campaign.image
                      : "https://images.unsplash.com/photo-1732800141005-2c59726e1961?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                />
              </CardHeader>
              <CardContent className="">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                  {campaign.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {campaign.description}
                </p>
                <Progress
                  value={Number(percentage) * 100}
                  className="h-2 mb-3 [&>div]:bg-primary"
                />
                <div className="flex justify-between text-sm mb-4">
                  <div>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(campaign.currentAmount)}
                    </span>
                    <span className="text-gray-400"> raised</span>
                  </div>
                  <div className="text-secondary font-medium">{Number(percentage) * 100}%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Users className="size-4" />
                    {campaign.totalDonors} donors
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <CalendarDays className="size-4" /> {daysLeft} days left
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-primary cursor-pointer"
                  onClick={() =>
                    navigate(`/campaign/${campaign.slug}`, {
                      state: { from: location.pathname },
                    })
                  }
                >
                  Donate
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Button className="flex mt-10 w-full max-w-xs mx-auto" size="lg" variant="secondary">
        <Link className="flex items-center gap-2" to="/explore">
          View All Campaign <ArrowRight className="size-5" />
        </Link>
      </Button>
    </section>
  );
}
