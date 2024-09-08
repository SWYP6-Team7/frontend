import React from 'react'
import reactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Global } from '@emotion/react'
import globalStyle from '@/styles/globalStyle'

const reactRoot = document.querySelector('div#root')

const client = new QueryClient()

const prepare = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser')

    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    })
  }
}

prepare().then(() => {
  reactDOM.createRoot(reactRoot as HTMLElement).render(
    <QueryClientProvider client={client}>
      {/* globalstyle 적용  */}
      <Global styles={globalStyle} />
      <App />
    </QueryClientProvider>
  )
})
