import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import type { ComponentProps } from "react";

export function NavMenu(props: ComponentProps<typeof NavigationMenu>) {
  const navs = [
    { menu: "Home", href: "/" },
    { menu: "Explore", href: "/explore" },
    { menu: "About", href: "#" },
  ];

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {navs.map((nav) => (
          <NavigationMenuItem key={nav.menu}>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to={nav.href} className="bg-transparent">
                {nav.menu}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
