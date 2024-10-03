import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination d-flex justify-content-around align-items-center mt-4">
      <button
        className="btn btn-secondary"
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        Previous
      </button>

      <span>Page {currentPage} of {totalPages}</span>

      <button
        className="btn btn-secondary"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
