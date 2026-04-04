type TicketsPaginationProps = {
  page: number;
  pageCount: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function TicketsPagination({
  page,
  pageCount,
  totalItems,
  pageSize,
  onPageChange,
}: TicketsPaginationProps) {
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-zinc-500">
        Showing <span className="font-medium text-zinc-900">{startItem}</span>–
        <span className="font-medium text-zinc-900">{endItem}</span> of{" "}
        <span className="font-medium text-zinc-900">{totalItems}</span> tickets
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="inline-flex h-10 items-center rounded-xl border border-zinc-200 px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <div className="text-sm text-zinc-500">
          Page <span className="font-medium text-zinc-900">{page}</span> of{" "}
          <span className="font-medium text-zinc-900">{pageCount}</span>
        </div>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === pageCount}
          className="inline-flex h-10 items-center rounded-xl border border-zinc-200 px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
