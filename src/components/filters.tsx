import React from "react";
import type { SearchFilterBarProps } from "../types";
import Input from "./input";

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  filterOptions,
  onFilterChange,
  searchValue,
  onSearchChange,
  setPage,
  searchLabel = "Search",
}) => {
  const handleFilterChange = (key: string, value: string) => {
    const newState = { ...filters, [key]: value };
    onFilterChange(newState);
    setPage(1);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center bg-white px-3 py-2">
      <Input
        type="text"
        value={searchValue}
        onChange={(e) => {
          onSearchChange(e.target.value), setPage(1);
        }}
        placeholder={searchLabel}
      />
      {filterOptions?.map((filter) => (
        <div key={filter?.key}>
          <label className="mr-2 font-medium">{filter?.label}:</label>
          <select
            value={filters[filter?.key] || ""}
            onChange={(e) => handleFilterChange(filter?.key, e.target.value)}
            className="border border-slate-500 rounded-md px-2 py-1 min-w-[120px] bg-white focus:ring-2 focus:border-0 focus:ring-indigo-400 focus:outline-none"
          >
            <option value="">All</option>
            {filter?.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};
