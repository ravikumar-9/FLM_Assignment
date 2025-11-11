import type { Dispatch, SetStateAction } from "react";
import type React from "react";

export type inputProps = React.InputHTMLAttributes<HTMLInputElement>;

export type Company = {
  id: string;
  name: string;
  industry: string;
  location: string;
  numberOfEmployees: number;
  foundedYear: number;
  website: string;
  ceo: string;
  description: string;
  isHiring: string;
};

export interface FilterOption {
  label: string;
  key: string;
  options: string[];
}

export interface SearchFilterBarProps {
  filterOptions: FilterOption[];
  filters: Record<string, string>;
  onFilterChange: (criteria: Record<string, string>) => void;
  searchValue: string;
  onSearchChange: (val: string) => void;
  searchLabel?: string;
  setPage: Dispatch<SetStateAction<number>>;
}

export interface paginationProps {
  pageCount: number;
  handlePageClick: (selectedItem: { selected: number }) => void;
  forcePage?: number;
}
