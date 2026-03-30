import CampaignInfo from "@/components/landing/campaign-info";
import DonationAmount from "@/components/landing/donation-amount";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

export default function CampaignDetailPage() {
  return (
    <>
      <Navbar />
      <CampaignDetail />
      <Footer />
    </>
  );
}

function CampaignDetail() {
  return (
    <main className="flex min-h-svh items-center">
      <div className="w-full max-w-(--breakpoint-xl) mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <CampaignInfo />

          <DonationAmount />
        </div>
      </div>
    </main>
  );
}
