"use client";
import { errorStore } from "@/store/client/errorStore";
import {
  Mutation,
  MutationCache,
  Query,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient(updateError: (error: Error) => void, setIsMutationError: (isMutation: boolean) => void) {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error, query: Query<unknown, unknown, unknown, readonly unknown[]>) => {
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
        refetchOnMount: true,
        staleTime: 60 * 1000,
      },

      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  }); // QueryClient 상태 초기화
}

let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient(updateError: (error: Error) => void, setIsMutationError: (isMutation: boolean) => void) {
  if (typeof window === "undefined") {
    // Server일 경우
    // 매번 새로운 queryClient를 만든다.
    return makeQueryClient(updateError, setIsMutationError);
  } else {
    // Browser일 경우
    // queryClient가 존재하지 않을 경우에만 새로운 queryClient를 만든다.
    // React가 새 Client를 만들게 하기 위해 중요하다.
    if (!browserQueryClient) browserQueryClient = makeQueryClient(updateError, setIsMutationError);
    return browserQueryClient;
  }
}

export const queryClient = new QueryClient();
export default function QueryClientBoundary({ children }: React.PropsWithChildren) {
  const { updateError, setIsMutationError } = errorStore();

  const queryClient = getQueryClient(updateError, setIsMutationError);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
