interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_KAKAO_CLIENT_ID: string
  readonly VITE_NAVER_CLIENT_ID: string
  readonly VITE_NAVER_CLIENT_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
