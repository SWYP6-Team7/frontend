import React from 'react'
import reactDOM from 'react-dom/client'
import App from './App'

import worker from './mocks/browser'
const reactRoot = document.querySelector('div#root')
if (process.env.NODE_ENV === 'development') {
  worker.start()
}

reactDOM.createRoot(reactRoot as HTMLElement).render(<App />)
