import CampaignsLanding from "@/components/landing/campaigns";
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Impact from "@/components/landing/impact";
import Navbar from "@/components/landing/navbar";
import Partner from "@/components/landing/partner";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Partner />
      <CampaignsLanding />
      <Impact />
      <CTA />
      <Footer />
    </>
  );
}
