import { ArrowUpRight, CirclePlay } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="mx-auto grid max-w-(--breakpoint-xl) gap-12 px-6 py-32 md:py-44 lg:py-12 lg:grid-cols-2">
        <div>
          <Badge asChild className="rounded-full border-border py-1" variant="secondary">
            <Link to="#">
              Making a Global Difference <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Badge>
          <h1 className="mt-6 max-w-[17ch] font-semibold text-4xl leading-[1.2]! tracking-[-0.035em] md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
            Sharing <span className="text-lime-500 bg-lime-50 px-3 rounded-2xl">kindness</span>{" "}
            <br />
            is easier and more meaningful
          </h1>
          <p className="mt-6 max-w-[60ch] text-foreground/80 sm:text-lg">
            Join thousands of compassionate donors supporting verified campaigns across
            education, healthcare, water, food, and the environment. Every contribution creates
            real, lasting change.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Button className="rounded-full text-base px-4" size="lg">
              <Link className="flex items-center gap-2" to="/explore">
                Start Donating <ArrowUpRight className="size-5" />
              </Link>
            </Button>
            <Button className="rounded-full text-base shadow-none" size="lg" variant="outline">
              <CirclePlay className="h-5! w-5!" /> Watch Demo
            </Button>
          </div>
        </div>
        <img
          className="aspect-video w-full h-full object-cover rounded-xl bg-accent"
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </section>
  );
}
