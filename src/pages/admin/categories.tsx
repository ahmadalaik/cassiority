import CategoriesActionDialog from "@/components/categories/categories-action-dialog";
import CategoriesPrimaryButton from "@/components/categories/categories-primary-button";
import { useCategoriesColumns } from "@/components/categories/categories-columns";
import { DataTable } from "@/components/data-table";
import Main from "@/components/layout/main";
import CategoriesViewDialog from "@/components/categories/categories-view-dialog";
import CategoriesDeleteDialog from "@/components/categories/categories-delete-dialog";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { useCategories } from "@/hooks/public/use-categories";

export default function CategoriesPage() {
  const categoryColumns = useCategoriesColumns();
  const { data: categories, isLoading } = useCategories();

  // if (error) {
  //   console.error("Zod or Network Error:", error);
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <>
      <Main className="flex flex-col gap-4 px-8">
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <MainHeader />
            <DataTable
              key={categories?.length}
              columns={categoryColumns}
              data={categories ?? []}
              filter="category"
              columnSearch="name"
            />
          </>
        )}
      </Main>

      <CategoriesActionDialog />
      <CategoriesViewDialog />
      <CategoriesDeleteDialog />
    </>
  );
}

function MainHeader() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Category</h2>
        <p className="text-muted-foreground">Here&apos;s a list of charity categories!</p>
      </div>
      <CategoriesPrimaryButton />
    </div>
  );
}
