import { type Table } from "@tanstack/react-table";
import { Input } from "./ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filter: string;
  columnSearch: string;
}

export function DataTableToolbar<TData>({
  table,
  filter,
  columnSearch,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <DataTableToolbarInput
        table={table}
        filter={filter}
        columnSearch={columnSearch}
      />
      <DataTableViewOptions table={table} />
    </div>
  );
}

function DataTableToolbarInput<TData>({
  table,
  filter,
  columnSearch,
}: {
  table: Table<TData>;
  filter: string;
  columnSearch: string;
}) {
  return (
    <div className="flex flex-1 items-center gap-2">
      <Input
        placeholder={`Filter ${filter}...`}
        value={(table.getColumn(columnSearch)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(columnSearch)?.setFilterValue(event.target.value)
        }
        className="h-8 w-37.5 lg:w-62.5"
      />
    </div>
  );
}
