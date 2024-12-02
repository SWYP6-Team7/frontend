import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import prerender from '@prerenderer/rollup-plugin'
// import { getAvailableTrips } from '@/api/home'

// interface Travel {
//   travelNumber: number
//   title: string
//   userNumber: number
//   userName: string
//   tags: string[]
//   nowPerson: number
//   maxPerson: number
//   createdAt: string
//   registerDue: string
//   location: string
//   bookmarked: boolean
// }

// async function generateTripRoutes(accessToken: string) {
//   const staticRoutes = ['/']
//   const dynamicRoutes = await fetchTripIds(accessToken)
//   return staticRoutes.concat(dynamicRoutes)
// }

// async function fetchTripIds(accessToken: string) {
//   try {
//     const response = await getAvailableTrips(1, accessToken)

//     const trips: Travel[] = response.content

//     const validTripRoutes = trips.map(
//       (trip: Travel) => `/trip/detail/${trip.travelNumber}`
//     )

//     return validTripRoutes
//   } catch (error) {
//     console.error('Error fetching trip IDs:', error)
//     return []
//   }
// }

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react'
    }),
    prerender({
      routes: ['/trip/detail/132'],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500
      }
    })
  ],
  root: './src', // src 폴더를 루트로
  base: '/',
  build: {
    outDir: '../dist' // dist는 src 바깥에 생성
  },
  publicDir: '../public', // 루트 기준으로 상위 경로에 public 설정

  server: {
    port: 9999,
    open: true
  },
  envDir: '../',
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components')
      }
    ]
  }
})
