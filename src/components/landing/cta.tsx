import { ArrowUpRight, Megaphone } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <div className="px-0 py-16 sm:px-6">
      <div
        className="mx-auto max-w-5xl overflow-hidden px-10 py-14 shadow sm:rounded-xl sm:shadow-lg"
        style={{
          background:
            "linear-gradient(150deg, oklch(98.6% 0.031 120.757) 0%, oklch(96.7% 0.067 122.328) 20%, oklch(93.8% 0.127 124.321) 40%, oklch(89.7% 0.196 126.665) 60%, oklch(84.1% 0.238 128.85) 80%, oklch(76.8% 0.233 130.85) 100%)",
        }}
      >
        <h2 className="text-balance font-semibold text-4xl text-primary-foreground tracking-tight sm:text-5xl">
          Ready to be part of the change?
        </h2>
        <p className="mt-4 text-balance text-primary-foreground/80 text-xl/normal">
          Join 12,000+ donors already changing lives around the world. Every contribution, no
          matter the size, creates ripples of hope.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" variant="secondary">
            <Link className="flex items-center gap-2" to="/explore">
              Start Donating <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            <Link className="flex items-center gap-2" to="/dashboard/campaign">
              <Megaphone className="size-4" />
              Create Campaign
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
