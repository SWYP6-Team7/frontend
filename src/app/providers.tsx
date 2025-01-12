'use client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import QueryClientBoundary from '@/context/QueryClientBoundary'
import ErrorCatcher from '@/context/ErrorCatcher'
import { ReactNode } from 'react'
import RootStyleRegistry from './RootStyleRegistry'
import RQProvider from './RQProvider'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <RQProvider>
      <ErrorCatcher />

      <RootStyleRegistry> {children}</RootStyleRegistry>
    </RQProvider>
  )
}
