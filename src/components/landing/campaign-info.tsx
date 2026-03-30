import { CalendarClock, Share2, University, User, Users, Verified } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import { formatCurrency } from "@/lib/utils";
import { Progress } from "../ui/progress";
import { useParams } from "react-router-dom";
import { useGetCampaign } from "@/hooks/public/use-campaigns";

export default function CampaignInfo() {
  const { campaignSlug } = useParams();
  const { data: campaign, isLoading } = useGetCampaign(campaignSlug || "");

  if (!campaign) return;

  const targetDate = new Date(campaign.deadline);
  const today = new Date();
  const diffInMs: number = targetDate.getTime() - today.getTime();
  const daysLeft: number = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  const progress = campaign.currentAmount / campaign.targetAmount;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="lg:col-span-2">
      <div className="rounded-3xl overflow-hidden shadow-md mb-6 relative">
        <img
          src={
            typeof campaign.image === "string"
              ? campaign.image
              : "https://images.unsplash.com/photo-1732800141005-2c59726e1961?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="w-full h-80 md:h-100 object-cover"
          alt=""
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold text-lime-800 border border-lime-200 shadow-sm">
            <University /> {campaign.category.name}
          </Badge>
          <Badge className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold text-amber-700 border border-amber-200 shadow-sm">
            <CalendarClock /> {daysLeft} days left
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
          {campaign.title}
        </h1>
        <div className="flex items-center gap-3">
          {campaign.user.image ? (
            <img
              src={typeof campaign.user.image === "string" ? campaign.user.image : ""}
              alt=""
              className="size-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center text-lime-700">
              <User />
            </div>
          )}

          <div>
            <span className="text-sm text-gray-500">Fundraiser</span>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-800">{campaign.user.name}</p>
              <Verified className="text-lime-500" />
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-lime-500">
                  {formatCurrency(campaign.currentAmount)}
                </h1>
                <p className="text-sm font-light">
                  raised of{" "}
                  <span className="font-semibold">
                    {formatCurrency(campaign.targetAmount)}
                  </span>
                </p>
              </div>
              <Badge className="text-md px-4 py-1.5">{Number(progress) * 100}%</Badge>
            </div>
            <Progress value={Number(progress) * 100} />
          </CardContent>
          <CardFooter className="flex justify-between items-center text-sm">
            <span className="flex gap-2 items-center">
              <Users className="size-4.5" />
              {campaign.totalDonors} donors
            </span>
            <span className="flex gap-2 items-center">
              <CalendarClock className="size-4.5" />
              {daysLeft} days left
            </span>
            <span className="flex gap-2 items-center">
              <Share2 className="size-4.5" />
              Share
            </span>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl">About</h2>
          <p className="text-md text-muted-foreground leading-relaxed">
            {campaign.description}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {campaign.donations.map((donation) => (
            <Card>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                    <User />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base">{donation.donor}</h4>
                    <p className="text-muted-foreground text-sm">
                      {formatCurrency(donation.amount)}
                    </p>
                  </div>
                </div>
                {donation.notes && (
                  <p className="text-foreground text-sm">{donation.notes}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
