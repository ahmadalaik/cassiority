import {
  CreditCard,
  HandCoins,
  HandHeart,
  LayoutDashboard,
  Megaphone,
  Package,
  UserCog,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const getPrefix = (role: string) => {
  if (role === "admin") return "/admin";
  if (role === "fundraiser") return "/fundraiser";
  return "";
};

const getNavMain = (role: string) => {
  const prefix = getPrefix(role);

  return [
    {
      title: "Dashboard",
      url: `${prefix}/dashboard`,
      icon: LayoutDashboard,
      roles: ["user", "fundraiser", "admin"],
    },
    {
      title: "Categories",
      url: "/admin/dashboard/categories",
      icon: Package,
      roles: ["admin"],
    },
    {
      title: "Payment Methods",
      url: "/admin/dashboard/payment-methods",
      icon: CreditCard,
      roles: ["admin"],
    },
    {
      title: "Fundraisers",
      url: "/dashboard/fundraisers",
      icon: HandCoins,
      roles: ["user"],
    },
    {
      title: "Campaigns",
      url: "/fundraiser/dashboard/campaigns",
      icon: Megaphone,
      roles: ["fundraiser"],
    },
    {
      title: "Campaigns",
      url: "/admin/dashboard/manage-campaigns",
      icon: Megaphone,
      roles: ["admin"],
    },
    {
      title: "Donations",
      url: `${prefix}/dashboard/donations`,
      icon: HandHeart,
      roles: ["user", "fundraiser"],
    },
    {
      title: "Donations",
      url: "/admin/dashboard/manage-donations",
      icon: HandHeart,
      roles: ["admin"],
    },
    {
      title: "Fundraisers",
      url: "/admin/dashboard/manage-fundraisers",
      icon: UserCog,
      roles: ["admin"],
    },
  ].filter((item) => item.roles.includes(role));
};

export function NavMain() {
  const { data: user } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;

  const sideNav = getNavMain(user?.role);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {sideNav.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={item.url.endsWith(pathname)}>
              <a href={item.url}>
                {item.icon && <item.icon />}
                {item.title}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
