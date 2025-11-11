import { useEffect, useState } from "react";

const useDebounce = (query: string, timer: number) => {
  const [searchTerm, setSearchTerm] = useState(query);
  useEffect(() => {
    const id = setTimeout(() => {
      setSearchTerm(query);
    }, timer);

    return () => {
      clearTimeout(id);
    };
  }, [timer, query]);

  return searchTerm;
};

export default useDebounce;
