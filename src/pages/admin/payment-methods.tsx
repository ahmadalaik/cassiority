import { DataTable } from "@/components/data-table";
import Main from "@/components/layout/main";
import { usePaymentMethodsColumns } from "@/components/payment-methods/payment-methods-columns";
import PaymentMethodsDeleteDialog from "@/components/payment-methods/payment-methods-delete-dialog";
import PaymentMethodsActionDialog from "@/components/payment-methods/payment-methods-action-dialog";
import PaymentMethodsPrimaryButton from "@/components/payment-methods/payment-methods-primary-button";
import PaymentMethodsViewDialog from "@/components/payment-methods/payment-methods-view-dialog";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { usePaymentMethods } from "@/hooks/public/use-payment-methods";

export default function PaymentMethodsPage() {
  const campaignsColumns = usePaymentMethodsColumns();
  const { data: paymentMethods, isLoading } = usePaymentMethods();

  return (
    <>
      <Main className="flex flex-col gap-6 px-8">
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <MainHeader />
            <DataTable
              columns={campaignsColumns}
              data={paymentMethods ?? []}
              filter="Provider"
              columnSearch="provider"
            />
          </>
        )}
      </Main>

      <PaymentMethodsActionDialog />
      <PaymentMethodsViewDialog />
      <PaymentMethodsDeleteDialog />
    </>
  );
}

function MainHeader() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Payment Methods</h2>
        <p className="text-muted-foreground">Here&apos;s a list of charity payment methods!</p>
      </div>
      <PaymentMethodsPrimaryButton />
    </div>
  );
}
