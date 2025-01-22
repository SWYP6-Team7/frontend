"use client";
import { useState, useEffect } from "react";
import { errorStore } from "@/store/client/errorStore";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
export default function QueryClientBoundary({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient(); // QueryClient 상태 초기화
  const { updateError, setIsMutationError } = errorStore();
  function makeQueryClient() {
    return new QueryClient({
      queryCache: new QueryCache({
        onError: (error: Error) => updateError(error),
      }),
      mutationCache: new MutationCache({
        onError: (error: Error) => {
          updateError(error);
          setIsMutationError(true);
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
    });
  }
  function getQueryClient() {
    if (isServer) {
      // Server: always make a new query client
      return makeQueryClient();
    } else {
      // Browser: make a new query client if we don't already have one
      // This is very important, so we don't re-make a new client if React
      // suspends during the initial render. This may not be needed if we
      // have a suspense boundary BELOW the creation of the query client
      if (!browserQueryClient) browserQueryClient = makeQueryClient();
      return browserQueryClient;
    }
  }

  let browserQueryClient: QueryClient | undefined = undefined;

  console.log("queryClient", queryClient);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
