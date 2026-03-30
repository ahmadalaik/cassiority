import { Outlet } from "react-router-dom";
import { AppSidebar } from "../app-sidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import Header from "./header";
import { useEffect } from "react";

export default function DashboardLayout() {
  useEffect(() => {
    document.body.classList.add("bg-sidebar");

    return () => document.body.classList.remove("bg-sidebar");
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="@container/content">
        <Header />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
