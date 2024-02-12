import React from "react";
interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) => {
  return (
    <div className="join">
      <button
        className="join-item btn"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        «
      </button>
      <button className="join-item btn">Page {currentPage}</button>
      <button
        className="join-item btn"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        »
      </button>
    </div>
  );
};
