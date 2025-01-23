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
export default function QueryClientBoundary({ children }: React.PropsWithChildren) {
  const { updateError, setIsMutationError } = errorStore();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error) => updateError(error),
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
        if (mutationKey?.[0] === "refresh" || mutationKey?.[0] === "verifyEmailCode") {
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
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  }); // QueryClient 상태 초기화

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
