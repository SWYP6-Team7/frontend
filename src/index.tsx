import React from 'react'
import reactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Global } from '@emotion/react'
import globalStyle from '@/styles/globalStyle'
import { client } from './store/server/queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
const reactRoot = document.querySelector('div#root')

const prepare = async (): Promise<void> => {
  const { worker } = await import('./mocks/browser')

  await worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  })
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
