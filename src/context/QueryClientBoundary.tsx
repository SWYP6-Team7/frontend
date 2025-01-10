import { errorStore } from '@/store/client/errorStore'
import { errorToastUI } from '@/store/client/toastUI'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import React from 'react'

const QueryClientBoundary = ({ children }: React.PropsWithChildren) => {
  const { updateError, setIsMutationError } = errorStore()

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error) => updateError(error)
    }),
    mutationCache: new MutationCache({
      onError: (error: Error) => {
        updateError(error)
        setIsMutationError(true)
      }
    }),
    defaultOptions: {
      // 에러 전파를 위한 설정.
      queries: {
        throwOnError: false
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryClientBoundary
function setIsMutationError(arg0: boolean) {
  throw new Error('Function not implemented.')
}
