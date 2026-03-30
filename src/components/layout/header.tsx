import { useLocation } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [offset, setOffset] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setOffset(true);
    } else {
      setOffset(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const getBreadcrumbs = (pathname: string) => {
    const roles = ["admin", "fundraiser"];

    const segments = pathname.split("/").filter(Boolean);
    const hasRolePrefix = roles.includes(segments[0]);

    return hasRolePrefix ? segments.slice(1) : segments;
  };

  const pathnames = getBreadcrumbs(location.pathname);

  const formatSegment = (segment: string): string => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <header
      className={cn(
        "sticky top-0 flex h-16 shrink-0 items-center gap-2 transition-all ease-linear duration-300 z-10",
        offset ? "bg-background/20 backdrop-blur-lg shadow" : "",
      )}
    >
      <div className="flex items-center gap-2 px-8">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {pathnames.map((value: string, index: number) => {
              const routeTo: string = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              const readableValue = formatSegment(value);

              return (
                <React.Fragment key={routeTo}>
                  {isLast ? (
                    <BreadcrumbItem key={routeTo}>
                      <BreadcrumbPage>{readableValue}</BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={`${routeTo}`}>{readableValue}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
