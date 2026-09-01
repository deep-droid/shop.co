interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-4">
      {/* Previous */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
        className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-xs transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span>←</span>
        <span>Previous</span>
      </button>

      {/* Pages */}
      <div className="hidden items-center gap-1 sm:flex">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`h-8 min-w-8 rounded-lg px-2 text-xs ${currentPage === page
                ? "bg-[#F0F0F0] font-medium"
                : "text-black/50 hover:text-black"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Mobile Page */}
      <span className="text-xs text-black/50 sm:hidden">
        {currentPage} / {totalPages}
      </span>

      {/* Next */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() =>
          setCurrentPage((page) => Math.min(totalPages, page + 1))
        }
        className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-xs transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span>Next</span>
        <span>→</span>
      </button>
    </div>
  );
}