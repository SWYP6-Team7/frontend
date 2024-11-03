import { errorStore } from '@/store/client/errorStore'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import React from 'react'

const QueryClientBoundary = ({ children }: React.PropsWithChildren) => {
  const { updateError } = errorStore()

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error) => updateError(error)
    }),
    mutationCache: new MutationCache({
      onError: (error: Error) => updateError(error)
    })
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryClientBoundary
