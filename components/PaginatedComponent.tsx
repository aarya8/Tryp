import { Data } from "@/app/page";
import React, { useState } from "react";
import { DataItem } from "./DataItem";
import styles from "./dataTable.module.css";

export const PaginatedComponent = ({
  data,
  elementsPerPage,
}: {
  data: Data[];
  elementsPerPage: number;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / elementsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageData = () => {
    const startIndex = (currentPage - 1) * elementsPerPage;
    const endIndex = startIndex + elementsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const renderPagination = () => {
    const paginationLinks = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationLinks.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }
    return paginationLinks;
  };

  return (
    <div>
      <div>
        {/* Render the elements for the current page */}
        {getPageData().map((element, index) => (
          <div key={index} className={styles.tableElement}>
            {" "}
            <DataItem data={element} />
          </div>
        ))}
      </div>
      <div>
        {/* Render pagination links */}
        {renderPagination()}
      </div>
    </div>
  );
};
