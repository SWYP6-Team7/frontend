import React from 'react'
import reactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Global } from '@emotion/react'
import globalStyle from '@/styles/globalStyle'
import { client } from './store/server/queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  // Tracing
  environment: 'production',
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  // tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})
const reactRoot = document.querySelector('div#root')

const prepare = async (): Promise<void> => {
  const { worker } = await import('./mocks/browser')

  // await worker.start({
  //   serviceWorker: {
  //     url: '/mockServiceWorker.js'
  //   }
  // })
}

prepare().then(() => {
  reactDOM.createRoot(reactRoot as HTMLElement).render(
    <QueryClientProvider client={client}>
      <HelmetProvider>
        {/* globalstyle 적용  */}
        <Global styles={globalStyle} />
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </HelmetProvider>
    </QueryClientProvider>
  )
})
