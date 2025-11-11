import React, { useCallback, useEffect, useState } from "react";
import { SearchFilterBar } from "./components/filters";
import type { Company, FilterOption } from "./types";
import useDebounce from "./hooks/useDebounce";
import Pagination from "./components/Pagination";
import {
  CheckCircle,
  ExternalLink,
  MapPin,
  Search,
  X,
  XCircle,
} from "lucide-react";

const filterOptions: FilterOption[] = [
  {
    label: "Industry",
    key: "industry",
    options: [
      "Conglomerate",
      "Banking",
      "IT Services",
      "Information Technology",
      "Technology",
      "E-commerce",
      "Automotive",
      "Telecom",
      "Engineering",
      "Pharmaceuticals",
      "Manufacturing",
      "FoodTech",
      "Transportation",
      "Fintech",
      "Retail",
      "Semiconductors",
      "Entertainment",
      "Social Media",
      "Food & Beverage",
      "Steel",
      "Software",
      "Energy",
      "Telecommunications",
    ],
  },
  {
    label: "Location",
    key: "location",
    options: [
      "Mumbai",
      "Bangalore",
      "USA",
      "Gurgaon",
      "Ahmedabad",
      "Kolkata",
      "Noida",
      "Pune",
      "South Korea",
      "Japan",
      "Germany",
      "China",
      "UK",
    ],
  },
];

const App: React.FC = () => {
  const [data, setData] = useState<Company[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const debouncedSearchValue = useDebounce(search, 500);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchCompanies = useCallback(async () => {
    try {
      const raw = await fetch("/companies.json");
      let filtered: Company[] = await raw.json();
      Object.entries(filters)?.forEach(([key, value]) => {
        if (value)
          filtered = filtered?.filter((c) => c[key as keyof Company] === value);
      });
      if (search)
        filtered = filtered?.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase())
        );
      const startPage = (page - 1) * limit;
      const endPage = page * limit;
      const paginatedData = filtered?.slice(startPage, endPage);
      setTotal(filtered?.length);
      setTotalPages(Math.ceil(filtered?.length / limit));
      setData(paginatedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [filters, search, page, limit]);

  useEffect(() => {
    fetchCompanies();
  }, [filters, debouncedSearchValue, page]);

  const handlePageClick = useCallback(async (data: { selected: number }) => {
    const currentPage = await data?.selected;
    console.log(currentPage);
    setPage(currentPage + 1);
  }, []);

  const handleClearFilters = () => {
    setFilters({});
    setSearch("");
    setPage(1);
  };

  const hasActiveFilters =
    Object.values(filters)?.some((value) => value) || search;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Company Directory
          </h1>
          <p className="text-gray-600">
            Browse and filter through our comprehensive company database
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Filters & Search
            </h2>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200 border border-red-200"
              >
                Clear All Filters
              </button>
            )}
          </div>
          <SearchFilterBar
            filters={filters}
            filterOptions={filterOptions}
            onFilterChange={setFilters}
            searchValue={search}
            onSearchChange={setSearch}
            searchLabel="Search company"
            setPage={setPage}
          />

          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {search && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Search: "{search}"
                  <button
                    onClick={() => setSearch("")}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
              {Object.entries(filters)?.map(([key, value]) =>
                value ? (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                  >
                    {key.charAt(0)?.toUpperCase() + key.slice(1)}: {value}
                    <button
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, [key]: "" }))
                      }
                      className="ml-1 hover:bg-indigo-200 rounded-full p-0.5"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ) : null
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
              <p className="text-lg font-semibold text-gray-600">
                Loading companies...
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-indigo-600 to-blue-600">
                    <tr>
                      {[
                        "Name",
                        "Industry",
                        "Location",
                        "Employees",
                        "Founded",
                        "Website",
                        "CEO",
                        "Description",
                        "Hiring",
                      ]?.map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {data?.map((company, index) => (
                      <tr
                        key={company?.id}
                        className={`transition-all duration-200 hover:bg-indigo-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold text-gray-900">
                            {company?.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-md bg-purple-100 text-purple-800">
                            {company?.industry}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {company?.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                          {company?.numberOfEmployees?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                          {company?.foundedYear}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={company?.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                          >
                            Visit
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                          {company?.ceo}
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {company?.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {company?.isHiring ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                              <CheckCircle className="h-3 w-3" />
                              Hiring
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                              <XCircle className="h-3 w-3" />
                              Not Hiring
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {data?.length === 0 && (
                      <tr>
                        <td colSpan={9} className="text-center py-16">
                          <div className="flex flex-col items-center justify-center">
                            <Search />
                            <p className="text-lg font-semibold text-gray-600 mb-1">
                              No companies found
                            </p>
                            <p className="text-sm text-gray-500">
                              Try adjusting your filters or search criteria
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {data?.length > 0 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
                  <div className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-bold text-gray-900">
                      {!total ? 0 : (page - 1) * limit + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-bold text-gray-900">
                      {total < (page - 1) * limit + limit
                        ? total
                        : (page - 1) * limit + limit}
                    </span>{" "}
                    of <span className="font-bold text-gray-900">{total}</span>{" "}
                    entries
                  </div>
                  <Pagination
                    pageCount={totalPages}
                    forcePage={Math.floor(((page - 1) * limit) / limit)}
                    handlePageClick={handlePageClick}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
