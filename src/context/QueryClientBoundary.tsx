"use client";
import { useState, useEffect } from "react";
import { errorStore } from "@/store/client/errorStore";
import {
  Mutation,
  MutationCache,
  Query,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function QueryClientBoundary({
  children,
}: React.PropsWithChildren) {
  const { updateError, setIsMutationError } = errorStore();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (
        error: Error,
        query: Query<unknown, unknown, unknown, readonly unknown[]>
      ) => {
        const queryKey = query?.queryKey;
        if (queryKey?.[0] === "profileImg" || queryKey?.[0] === "relation") {
          console.log("error handling", query);
        } else {
          updateError(error);
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (
        error: Error,
        variables: unknown,
        context: unknown,
        mutation?: Mutation<unknown, unknown, unknown, unknown>
      ) => {
        const mutationKey = mutation?.options?.mutationKey;
        console.log("error handling", mutation);
        if (
          mutationKey?.[0] === "refresh" ||
          mutationKey?.[0] === "verifyEmailCode" ||
          mutationKey?.[0] === "firstProfileImage" ||
          mutationKey?.[0] === "emailLogin"
        ) {
          console.log("error handling", error);
        } else {
          updateError(error);
          setIsMutationError(true);
        }
      },
    }),
    defaultOptions: {
      // 에러 전파를 위한 설정.
      queries: {
        throwOnError: false,
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  }); // QueryClient 상태 초기화

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
