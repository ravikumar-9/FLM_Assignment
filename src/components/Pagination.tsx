import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactPaginate from "react-paginate";
import type { paginationProps } from "../types";

const Pagination = (props: paginationProps) => {
  return (
    <ReactPaginate
      pageCount={props.pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      breakLabel="..."
      nextLabel={<ArrowRight className="h-4 w-4" />}
      previousLabel={<ArrowLeft className="h-4 w-4" />}
      onPageChange={props?.handlePageClick}
      forcePage={props?.forcePage}
      containerClassName="flex items-center gap-2 mt-4 flex-wrap"
      pageClassName="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-400 text-sm cursor-pointer"
      pageLinkClassName="w-full h-full flex items-center justify-center"
      activeClassName="bg-blue-600 text-white"
      previousClassName="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-400 text-sm cursor-pointer"
      nextClassName="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-400 text-sm cursor-pointer"
      breakClassName="h-10 w-10 flex items-center justify-center text-gray-500"
    />
  );
};

export default Pagination;
