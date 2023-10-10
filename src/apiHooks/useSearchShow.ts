import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../utils/apiFetch";
import { IshowSearchGuard } from "../utils";
import { useCallback, useMemo, useState } from "react";

export const useSearchShow = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: responseData, isLoading } = useQuery({
    queryKey: ["shows", search],
    enabled: search !== "",
    queryFn: ({ signal }) =>
      apiFetch(
        `https://api.tvmaze.com/search/shows?q=${search}`,
        IshowSearchGuard,
        { signal, isArray: true }
      ),
  });

  const handleSearch = useCallback(
    (value: string) => {
      queryClient.cancelQueries(["shows"]);
      setSearch(value);
    },
    [queryClient]
  );

  const data = useMemo(() => responseData ?? [], [responseData]);

  return {
    data,
    isLoading: isLoading && search !== "",
    setSearch: handleSearch,
  };
};
