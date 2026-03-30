import { Command, Dribbble, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "Contact",
    href: "/#contact",
  },
  {
    title: "Terms of Service",
    href: "/#terms",
  },
  {
    title: "Privacy Policy",
    href: "/#privacy",
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background px-6 py-2">
      <div className="mx-auto w-full max-w-(--breakpoint-xl) divide-y">
        <div className="flex flex-col items-center justify-between gap-4 px-2 pt-3 pb-5 sm:flex-row">
          <Link className="flex items-center gap-2" to="/">
            <Command />
            <span className="font-bold text-xl">Cassiority</span>
          </Link>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium text-sm">
            {links.map(({ title, href }) => (
              <li key={title}>
                <Link to={href}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col-reverse items-center justify-between gap-4 px-2 pt-4 pb-2 sm:flex-row">
          <p className="font-medium text-muted-foreground text-sm">
            Copyright &copy; {new Date().getFullYear()} Cassiority. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Dribbble className="h-5 w-5 text-muted-foreground" />
            </Link>
            <Link to="/">
              <Twitter className="h-5 w-5 text-muted-foreground" />
            </Link>
            <Link to="/">
              <Github className="h-5 w-5 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
