import React from "react";
import type { inputProps } from "../types";

const Input: React.FC<inputProps> = (props) => {
  return (
    <div className="">
      <input
        {...props}
        type="text"
        className="border border-slate-500 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-0 px-3 py-2 w-64 focus:outline-none text-sm placeholder:text-gray-600 text-gray-800 font-normal"
      />
    </div>
  );
};

export default Input;
