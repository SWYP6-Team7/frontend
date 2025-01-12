'use client'
import { ErrorBoundary } from 'react-error-boundary'
import Fallback from './Fallback'

export const GlobalErrorBoundary = ({
  children
}: {
  children: React.ReactNode
}) => {
  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>
}
