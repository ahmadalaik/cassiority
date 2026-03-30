import { HandHeart, Home, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function BottomNav() {
  const navs = [
    { menu: "Home", href: "/", icon: Home },
    { menu: "Campaign", href: "/", icon: Megaphone },
    { menu: "Donation", href: "/", icon: HandHeart },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg mx-auto md:hidden">
      <div className="flex justify-around items-center px-4 py-2">
        {navs.map((item) => (
          <Link
            to={item.href}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
            prefetch="none"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.menu}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
