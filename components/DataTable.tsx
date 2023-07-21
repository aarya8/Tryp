"use client";
import { Data } from "@/app/page";
import { useMemo, useState } from "react";
import { types } from "util";
import styles from "./dataTable.module.css";
import { DataItem } from "./DataItem";
import { PaginatedComponent } from "./PaginatedComponent";

export const DataTable = ({
  rows,
  caption,
  headers,
}: {
  rows: Data[];
  caption?: string;
  headers: string[];
}) => {
  const [tableData, setTableData] = useState(rows);
  const [sortKey, setSortKey] = useState<keyof Headers | string>();
  const [isAscending, setIsAscending] = useState(true);

  const onHeaderClick = (key: string) => {
    if (sortKey === key) {
      // If the same header is clicked again, toggle the sorting order
      setIsAscending(!isAscending);
    } else {
      // If a different header is clicked, sort in ascending order by default
      setSortKey(key);
      setIsAscending(true);
    }
  };

  const sortedData = useMemo(() => {
    if (sortKey === null) {
      return tableData;
    }

    const sortedArray = [...tableData].sort((a, b) => {
      const valueA = a[sortKey as keyof Data];
      const valueB = b[sortKey as keyof Data];

      if (valueA < valueB) {
        return isAscending ? -1 : 1;
      }
      if (valueA > valueB) {
        return isAscending ? 1 : -1;
      }
      return 0;
    });

    return sortedArray;
  }, [tableData, sortKey, isAscending]);
  function updateSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;

    if (!query) {
      setTableData(rows);
    }

    const regex = new RegExp(query, "i"); // Case-insensitive regular expression

    setTableData(
      rows.filter((item) => regex.test(item.mail) || regex.test(item.name))
    );
  }
  function filterTable(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;

    if (value === "all") {
      setTableData(rows);
    } else {
      setTableData(rows.filter((item) => item.status === value));
    }
  }
  return (
    <section>
      <input
        type="search"
        placeholder="search"
        className={styles.search}
        onChange={updateSearch}
      ></input>

      <h1>{caption}</h1>
      <label className={styles.label}>Filter By Status:</label>
      <select
        id="status"
        name="payement"
        onChange={(e) => filterTable}
        className={styles.filter}
      >
        <option value="all">All</option>
        <option value="Failed">Failed</option>
        <option value="Paid">Paid</option>
        <option value="Waiting">Waiting</option>
      </select>

      <div className={styles.tableHeading}>
        {headers.map((item, id) => (
          <h3
            key="item"
            onClick={() => onHeaderClick(item)}
            className={styles.heading}
          >
            {item}
          </h3>
        ))}
      </div>
      <PaginatedComponent data={sortedData} elementsPerPage={5} />
    </section>
  );
};
