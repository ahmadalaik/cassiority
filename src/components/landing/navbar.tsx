import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/stores/use-auth-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Logo } from "./logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const roles = ["admin", "fundraiser"];

  // const { data: user } = useAuth();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-4 top-6 z-50 transition-all mx-auto duration-500 h-16",
        scrolled
          ? "max-w-(--breakpoint-xl) rounded-full border bg-background/80 backdrop-blur shadow-sm"
          : "max-w-full bg-transparent",
      )}
    >
      <div className="mx-auto flex h-full items-center justify-between px-4 lg:px-5">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />
        <div className="flex items-center gap-3">
          {user.isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src={user.avatar || undefined} alt={user.name || undefined} />
                    <AvatarFallback className="rounded-lg">
                      {user.name?.charAt(0) || "CO"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-32">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      if (roles.includes(user.role as string))
                        navigate(`/${user.role}/dashboard`);
                      else navigate("/dashboard");
                    }}
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (roles.includes(user.role as string))
                        navigate(`/${user.role}/dashboard/setting`);
                      else navigate("/dashboard/setting");
                    }}
                  >
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive" onClick={logout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button className="hidden rounded-full sm:inline-flex" variant="outline">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button className="rounded-full">Get Started</Button>
            </>
          )}
          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
