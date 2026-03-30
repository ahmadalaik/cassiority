import { Clock, Megaphone, SearchIcon, Settings2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Progress } from "../ui/progress";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExploreSkeleton from "./explore-skeleton";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { useSearchCampaignsByCategory } from "@/hooks/public/use-campaigns";
import { useCategories } from "@/hooks/public/use-categories";

export default function ExploreCampaign() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data: categories } = useCategories();
  const { data: campaigns, isLoading } = useSearchCampaignsByCategory(selectedCategory, page);

  return (
    <main className="flex min-h-svh items-center">
      <div className="w-full max-w-(--breakpoint-xl) mx-auto px-6 py-32">
        {/* <ExploreSkeleton /> */}
        {/* Grid View */}

        {isLoading ? (
          <ExploreSkeleton />
        ) : !campaigns || campaigns.data.length === 0 ? (
          <Empty className="border">
            <EmptyHeader className="py-10">
              <EmptyMedia variant="icon" className="size-15">
                <Megaphone className="size-9" />
              </EmptyMedia>
              <EmptyTitle>No campaigns</EmptyTitle>
              <EmptyDescription className="max-w-xs text-pretty">
                There is no campaign is running.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
                Explore the <span className="text-lime-500">campaign</span>
              </h1>
              <p className="text-gray-500 text-lg">
                Find a good movement that suits your heart.
              </p>
            </div>
            <div
              className="flex items-center gap-4 overflow-x-auto hide-scrollbar"
              style={{ scrollbarWidth: "thin" }}
            >
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                className="px-5 py-5 text-sm font-medium rounded-full border hover:border-primary transition whitespace-nowrap shadow-none"
                onClick={() => setSelectedCategory("")}
              >
                All Categories
              </Button>
              {categories?.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.slug ? "default" : "outline"}
                  className="px-5 py-5 text-sm font-medium rounded-full border hover:border-primary transition whitespace-nowrap shadow-none"
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <div className="flex flex-row items-center gap-3">
              <Field className="max-w-(--breakpoint-xl)">
                <InputGroup className="py-6 rounded-lg">
                  <InputGroupInput id="inline-start-input" placeholder="Search..." />
                  <InputGroupAddon align="inline-start">
                    <SearchIcon className="text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Button variant="outline" className="py-6 rounded-lg">
                <Settings2Icon /> Filter
              </Button>
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
              id="campaignGrid"
            >
              {campaigns &&
                campaigns.data.length > 0 &&
                campaigns.data.map((campaign) => {
                  const progress =
                    Number(campaign.currentAmount / campaign.targetAmount) * 100;
                  const targetDate = new Date(campaign.deadline);
                  const today = new Date();
                  const diffInMs: number = targetDate.getTime() - today.getTime();
                  const daysLeft: number = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

                  return (
                    <Card key={campaign.id} className="pt-0 overflow-hidden">
                      <CardContent className="p-0">
                        <img
                          alt={campaign.title}
                          className="aspect-14/9 w-full"
                          src={
                            typeof campaign.image === "string"
                              ? campaign.image
                              : "https://images.unsplash.com/photo-1732800141005-2c59726e1961?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          }
                        />
                      </CardContent>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <Badge className="bg-lime-50 text-lime-500 font-semibold">
                            {campaign.category.name}
                          </Badge>
                          <span className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Clock className="w-4 h-4" />
                            {daysLeft} days left
                          </span>
                        </div>
                        <CardTitle>{campaign.title}</CardTitle>
                        <CardDescription>{campaign.description}</CardDescription>
                        <div className="flex justify-between text-sm pt-2">
                          <span className="font-medium text-primary">
                            {formatCurrency(campaign.currentAmount)}
                          </span>
                          <span className="text-muted-foreground">
                            {progress}% of {formatCurrency(campaign.targetAmount)}
                          </span>
                        </div>
                        <Progress value={progress} />
                      </CardHeader>
                      <CardFooter>
                        <Button
                          variant="secondary"
                          className="w-full"
                          onClick={() =>
                            navigate(`/campaign/${campaign.slug}`, {
                              state: { from: location.pathname },
                            })
                          }
                        >
                          View detail
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
            </div>

            {/* Pagination */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(page - 1);
                    }}
                    className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {[...Array(campaigns.meta.total_pages || 0)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        isActive={page === pageNumber}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(pageNumber);
                        }}
                        // className={
                        //   page === pageNumber ? "pointer-events-none" : "cursor-pointer"
                        // }
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {campaigns.meta.total_pages > 5 && <PaginationEllipsis />}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < campaigns.meta.total_pages) setPage(page + 1);
                    }}
                    className={
                      page >= campaigns.meta.total_pages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </main>
  );
}
