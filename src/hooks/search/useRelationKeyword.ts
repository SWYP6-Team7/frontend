"use client";
import { getSearchRelation } from "@/api/search";
import { authStore } from "@/store/client/authStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useRelationKeyword = (keyword: string) => {
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  const { accessToken, isGuestUser } = authStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ["relation", debouncedKeyword],

    queryFn: () =>
      getSearchRelation(debouncedKeyword.replace(" ", ""), accessToken),
    enabled:
      debouncedKeyword.replace(" ", "") !== "" &&
      (isGuestUser || !!accessToken),
  });

  useEffect(() => {
    if (keyword.length === 1) {
      setDebouncedKeyword(keyword);
    }
    const handler = setTimeout(() => {
      if (keyword.length > 0) {
        if (
          (keyword.charCodeAt(keyword.length - 1) >= 0xac00 &&
            keyword.charCodeAt(keyword.length - 1) <= 0xd7a3) ||
          (keyword.charCodeAt(keyword.length - 1) >= 65 &&
            keyword.charCodeAt(keyword.length - 1) <= 90) ||
          (keyword.charCodeAt(keyword.length - 1) >= 97 &&
            keyword.charCodeAt(keyword.length - 1) <= 122)
        ) {
          setDebouncedKeyword(keyword);
        }
      }
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  return { data, isLoading, error };
};

export default useRelationKeyword;
