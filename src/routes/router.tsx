import PublicRoute from "@/middlewares/public-route";
import Register from "@/pages/auth/register";
import Login from "@/pages/auth/login";
import CategoriesPage from "@/pages/admin/categories";
import DonationsPage from "@/pages/user/donations";
import PaymentMethodsPage from "@/pages/admin/payment-methods";
import { Route, Routes } from "react-router-dom";
import LandingPage from "@/pages/landing/landing-page";
import LandingPageDraft from "@/pages/landing/landing-page-draft";
import ProtectedRoute from "@/middlewares/protected-route";
import Unauthorized from "@/pages/auth/unauthorized";
import SettingPage from "@/pages/admin/setting";
import ExplorePage from "@/pages/landing/explore-page";
import CampaignDetailPage from "@/pages/landing/campaign-detail";
import DonationConfirmationPage from "@/pages/landing/donation-confirmation";
import DashboardLayout from "@/components/layout/dashboard-layout";
import FundraiserPage from "@/pages/user/fundraiser";
import FundraiserManagePage from "@/pages/admin/fundraiser";
import CampaignsManagePage from "@/pages/admin/campaigns";
import FundraiserCampaignsPage from "@/pages/fundraiser/campaigns";
import ManageDonationsPage from "@/pages/admin/donations";
import AdminDashboardPage from "@/pages/admin/dashboard";
import FundraiserDashboardPage from "@/pages/fundraiser/dashboard";
import UserDashboardPage from "@/pages/user/dashboard";
import FundraiserDonationsPage from "@/pages/fundraiser/donations";
import NotFoundPage from "@/pages/404";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/campaign/:campaignSlug" element={<CampaignDetailPage />} />
      <Route path="/checkout/:campaignSlug/:amount" element={<DonationConfirmationPage />} />
      <Route path="/draft" element={<LandingPageDraft />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["fundraiser", "user"]} />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="donations" element={<DonationsPage />} />
        </Route>
      </Route>

      <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<UserDashboardPage />} />
          <Route path="fundraisers" element={<FundraiserPage />} />
          <Route path="setting" element={<SettingPage />} />
        </Route>
      </Route>

      <Route path="/fundraiser" element={<ProtectedRoute allowedRoles={["fundraiser"]} />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<FundraiserDashboardPage />} />
          <Route path="campaigns" element={<FundraiserCampaignsPage />} />
          <Route path="donations" element={<FundraiserDonationsPage />} />
          <Route path="setting" element={<SettingPage />} />
        </Route>
      </Route>

      <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="payment-methods" element={<PaymentMethodsPage />} />
          <Route path="manage-campaigns" element={<CampaignsManagePage />} />
          <Route path="manage-donations" element={<ManageDonationsPage />} />
          <Route path="manage-fundraisers" element={<FundraiserManagePage />} />
          <Route path="setting" element={<SettingPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
