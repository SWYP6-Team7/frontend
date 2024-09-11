import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react'
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
