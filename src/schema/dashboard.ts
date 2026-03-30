import { z } from "zod";

export const dasboardStatsSchema = z.object({
  totalCategories: z.int(),
  totalCampaigns: z.int(),
  totalDonors: z.int(),
  totalRaised: z.bigint(),
  dailyStats: z.array(
    z.object({
      date: z.string(),
      totalAmount: z.bigint().nullable(),
      totalDonors: z.int().nullable(),
    }),
  ),
  categoryChart: z.array(
    z.object({
      categoryName: z.string(),
      totalAmount: z.bigint().nullable(),
      percentage: z.int().nullable(),
    }),
  ),
});

export const fundraiserDashboardStatsSchema = z.object({
  totalCampaigns: z.int(),
  totalDonors: z.int(),
  totalRaised: z.bigint(),
  recentCampaign: z.object({
    id: z.int(),
    title: z.string(),
    image: z.string().nullable(),
    imageId: z.string().nullable(),
  }),
  recentDonations: z.array(
    z.object({
      id: z.int(),
      donor: z.string(),
      amount: z.bigint(),
    }),
  ),
});

export const userDashboardStatsSchema = z.object({
  recentDonations: z.array(
    z.object({
      id: z.int(),
      donor: z.string(),
      amount: z.bigint(),
    }),
  ),
  totalDonations: z.int(),
  totalSpend: z.bigint(),
  averageSpend: z.int(),
});

export type AdminDasboardStats = z.infer<typeof dasboardStatsSchema>;
export type FundraiserDasboardStats = z.infer<typeof fundraiserDashboardStatsSchema>;
export type UserDashboardStats = z.infer<typeof userDashboardStatsSchema>;
