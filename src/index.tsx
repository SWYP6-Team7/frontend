import React from 'react'
import reactDOM from 'react-dom/client'
import App from './App'

const reactRoot = document.querySelector('div#root')

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
  reactDOM.createRoot(reactRoot as HTMLElement).render(<App />)
})
